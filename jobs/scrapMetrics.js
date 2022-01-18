class ScrapMetrics{

    constructor(httpAdapter, baseConfig, utils){
        this.httpAdapter = httpAdapter;
        this.baseConfig = baseConfig;
        this.utils = utils;
    }

    async scrapeUrls(){
        const urls = this.baseConfig.urls;
        const scrapeUrlPromises = [];
        for(const url of urls){
            scrapeUrlPromises.add(this.scrapeUrl(url, 'GET', {}, {}, {}, 1000))
        }
        const metricsResponse = await this.utils.invoker(Promise.all(scrapeUrlPromises));
        await this.pushToDD(metricsResponse);
    }

    async scrapeUrl(url, method, headers, params, data, timeout){
        return await this.httpAdapter.makeRequest(url, method, headers, params, data, timeout);
    }

    async pushToDD(responseArray){
        const url = this.baseConfig.ddUrl;
        const method = "GET";
        const headers = {};
        headers["contentType"] = "text/json";
        headers["DD-API-KEY"] = this.baseConfig.ddApiKey;
        const pushToDDPromises = [];
        for(const response in responseArray){
            pushToDDPromises.add(this.httpAdapter.makeRequest(url, method, headers, {}, response, 5000));
        }
        return await this.utils.invoker(Promise.all(pushToDDPromises));

    }

}
module.exports=ScrapMetrics;