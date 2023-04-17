// парсим xml в dom, достаём из него заголовок, описание и items, упаковываем в объект


export default (stringContainingXMLSource) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringContainingXMLSource, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
  // parsing failed
    return false;
    } else {
  // parsing succeeded
    const rssData = doc.documentElement;
    const channel = rssData.childNodes[1];
    const channelData = Array.from(channel.childNodes)
                             .filter((el) => el.nodeType !== 3)
                             .reduce((acc, node) => {
                                if (node.nodeName === 'title' || node.nodeName === 'description') {
                                    acc[node.nodeName] = node.innerHTML;
                                    return acc;
                                }
                                if (node.nodeName === 'item') {
                                    if (!Object.hasOwn(acc, 'items')) {
                                        acc['items'] = [];
                                    }
                                    const item = Array.from(node.childNodes)
                                                      .filter((el) => el.nodeType !== 3)
                                                      .reduce((acc, node) => {
                                                        acc[node.nodeName] = node.innerHTML;
                                                        return acc;
                                                      }, {});
                                    acc['items'].push(item);
                                    return acc;
                                }
                                return acc;
                             }, {});
    return channelData;
    }
};

