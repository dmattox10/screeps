var harvesters = {
  spawn: (spawn_name) => {
    var name = 'harvester' + Game.time // TODO switch to UUID-Lib
    var components = [WORK,CARRY,MOVE]
    Game.spawns[spawn_name].spawnCreep(components, name, {memory: {role: 'harvester'}})
  },
  run: (creep, room_name) => {
      if(creep.carry.energy < creep.carryCapacity) {
          // TODO Pass in room name!
            var sources = Memory.rooms.room_name.sources
            if(creep.harvest(Memory.rooms.room_name.sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Memory.rooms.room_name.sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } // if creep has room for energy
        else {

            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } // if targets.length
        } //else
    }
}

module.exports = harvesters
