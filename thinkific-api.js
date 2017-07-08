//const ThinkificApi = require('thinkific-api');

module.exports = function(RED) {
    function ThinkificApi(config) {
        RED.nodes.createNode(this,config);
        // Retrieve the config node
        this.thinkific = RED.nodes.getNode(config.thinkific);
        
        this.resource = config.resource;
        this.operation = config.operation;
        var node = this;
        //var thinkific = new ThinkificApi(config.configNode.apikey, config.configNode.subdomain);
        node.on('input', function(msg) {
            var r = thinkific[node.resource];
            node.send({payload: {
                resource: node.resource,
                operation: node.operation,
                thinkific: node.thinkific || 'naotem'
            }});
        });
    }

    RED.nodes.registerType("thinkific", function (config){
        RED.nodes.createNode(this,config);
        this.apikey = config.apikey;
        this.subdomain = config.subdomain;
    });

    RED.nodes.registerType("thinkific-api",ThinkificApi);

}