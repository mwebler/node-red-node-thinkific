const Thinkific = require('thinkific-api').default;

module.exports = function(RED) {
    function ThinkificApi(config) {
        RED.nodes.createNode(this,config);
        // Retrieve the config node
        this.configNode = RED.nodes.getNode(config.thinkific);
        
        this.resource = config.resource;
        this.operation = config.operation;
        var node = this;

        var opts = {
            apiKey: this.configNode.apikey,
            subdomain: this.configNode.subdomain
        }
        var ThinkificClient = new Thinkific(opts);

        node.on('input', function(msg) {
            var r = ThinkificClient[node.resource];
            console.log(r);
            var args = msg.payload.parameters;
            console.log(r[node.operation]);
            r[node.operation](...args).then(res => {
                console.log(res);
                node.send({payload: res});
            })
            .catch(err => {
                console.log(err);
            });

       });
    }

    RED.nodes.registerType("thinkific", function (config){
        RED.nodes.createNode(this,config);
        this.apikey = config.apikey;
        this.subdomain = config.subdomain;
    });

    RED.nodes.registerType("thinkific-api",ThinkificApi);

}