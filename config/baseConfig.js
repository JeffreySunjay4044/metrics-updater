const baseConfig = {
    port: 5052,
    urlScrapping:true,
    urls:["http://<namenodehost>:50070/jmx", "http://<datanodehost>:50075/jmx" ],
    ddApiKey: "test"
}
module.exports=baseConfig;