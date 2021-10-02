var mc = require('minecraft-protocol');
var server = mc.createServer({
  'online-mode': true,
  encryption: true,
  host: '0.0.0.0',
  port: 25555,
  'max-players': 250,
  motd: "Limbo Server",
  beforePing: getMotd
});
function getMotd(response,client){
response.version.name = "Any";
response.version.protocol = client.protocolVersion;
}
server.on('login', function(client) {
  const w = {
    piglin_safe: {
      type: 'byte',
      value: 0
    },
    natural: {
      type: 'byte',
      value: 1
    },
    ambient_light: {
      type: 'float',
      value: 0
    },
    infiniburn: {
      type: 'string',
      value: 'minecraft:infiniburn_overworld'
    },
    respawn_anchor_works: {
      type: 'byte',
      value: 0 I I
    },
    has_skylight: {
      type: 'byte',
      value: 1
    },
    bed_works: {
      type: 'byte',
      value: 1
    },
    has_raids: {
      type: 'byte',
      value: 1
    },
    name: {
      type: 'string',
      value: 'minecraft:overworld'
    },
    logical_height: {
      type: 'int',
      value: 256
    },
    shrunk: {
      type: 'byte',
      value: 0
    },
    ultrawarm: {
      type: 'byte',
      value: 0
    },
    has_ceiling: {
      type: 'byte',
      value: 0
    }
  }
  client.write('login', {
    entityId: client.id,
    levelType: 'default',
    gameMode: 0,
    previousGameMode: 255,
    worldNames: ['minecraft:overworld'],
    dimensionCodec: {name: '', type:'compound', value: {dimension: {type: 'list', value: {type: 'compound', value: [w]}}}},
    dimension: 'minecraft:overworld',
    worldName: 'minecraft:overworld',
    difficulty: 2,
    hashedSeed: [0, 0],
    maxPlayers: server.maxPlayers,
    reducedDebugInfo: false,
    enableRespawnScreen: true
  });
  client.write('position', {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  });
  var messages = ["You have been connected to Limbo.","You will be connected to an available lobby server as soon as possible.","Please be patient.","Please rejoin if this takes a long time."];
  messages.forEach(function(text){
  var msg = {
    translate: 'chat.type.announcement',
    "with": [
      'Limbo',
      text
    ]
  };
  client.write("chat", { message: JSON.stringify(msg), position: 0, sender: '0' });
  });
});
