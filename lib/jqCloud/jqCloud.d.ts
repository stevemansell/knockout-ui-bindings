declare module JQueryCloud {
    interface JQuery {
    }
}

interface JQuery {
    jQCloud(words: any, options?: any);
}

interface JQueryStatic {
    jQCloud: JQueryCloud.JQuery;
}