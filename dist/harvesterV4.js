spawn = (room, spawn_name, id) => {
    var name = 'harvester' + Game.time // TODO switch to UUID-Lib
    var components = [WORK,CARRY,MOVE]
    Game.spawns[spawn_name].spawnCreep(components, name, {
        memory: 
        {
            role: 'harvester',
            id: id,
            room: room
        }
    })
}

run = (creep, source) => {
    if(creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES)
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //creep.moveTo(Memory.rooms.room_name.sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
        }
    }
    else { // TODO Specialize this out into crreps for extensions, spawns, and towers
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
        }
    }
}

module.exports = {
    spawn,
    run
}