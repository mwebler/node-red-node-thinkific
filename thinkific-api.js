const ThinkificApi = require('thinkific-api');

module.exports = function(RED) {
    function ThinkificApi(config) {
        RED.nodes.createNode(this,config);
        this.configNode = config.configNode;
        this.resource = config.resource;
        this.operation = config.operation;
        var node = this;
        var thinkific = new ThinkificApi(config.configNode.apikey, config.configNode.subdomain);
        node.on('input', function(msg) {
            node.send(node.resource + ':' + node.operation);
        });
    }

    RED.nodes.registerType("thinkific", function ThinkificApiConfig(config){
        RED.nodes.createNode(this,config);
        this.apikey = config.apikey;
        this.subdomain = config.subdomain;
    });

    RED.nodes.registerType("thinkific-api",ThinkificApi);

}