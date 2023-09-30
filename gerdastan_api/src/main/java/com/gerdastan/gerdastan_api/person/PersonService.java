package com.gerdastan.gerdastan_api.person;

import com.gerdastan.gerdastan_api.person.dto.CreatePersonDTO;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public PersonEntity createPerson(PersonEntity createPersonDTO) {
       return personRepository.save(createPersonDTO);
    }
}
