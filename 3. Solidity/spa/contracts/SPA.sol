pragma solidity >= 0.8.17;

contract SPA {

    struct Animal {
        string race;
        uint8 size;
        uint8 age;
        bool isAdopted;
    }

    Animal[] animals;

    mapping(address => Animal) masterAnimal;

    event animalRegistered(uint8 _id);
    event animalAdopted(uint8 _id);


    function Set(string memory _race, uint8 _size, uint _age) external {
        Animal memory tmpAnimal = Animal({
            race: _race,
            size: _size,
            age: _age,
            isAdopted: false
        });
        animals.push(tmpAnimal);

        emit animalRegistered(animals.length - 1);
    }

    function Get(uint8 memory _id) external view returns (Animal memory pet) {
        require(_id <= animals.length, "animal does not exist");
        return pet = animals[_id];
    }


    function adopt(uint8 _index) external {
        require(!animals[0].isAdopted, "Pet is not available");
        masterAnimal[msg.sender] = animals[0];
        animals[0].isAdopted = true;
    }

    function search(string memory _race, uint8 _size, uint8 _age) {
        Animal[] memory animalList;
        if (bytes(_race).length > 0) {
            for (uint i ; i < animals.length; i++) {
            animalList = searchByRace(_race);
        }
    }

    function searchByRace(string memory _race) private {
        Animal[] memory animalList;

            if (animals[i].race == _race) {
                animalList.push(animals[i]);
            }
        }
    }

    function Delete(uint8 _id) external {
        animals[_id] = animals[animals.length - 1];
        animals.pop();
    }
}