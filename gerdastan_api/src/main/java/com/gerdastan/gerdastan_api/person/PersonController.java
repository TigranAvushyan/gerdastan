package com.gerdastan.gerdastan_api.person;

import com.gerdastan.gerdastan_api.person.dto.CreatePersonDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/person")
public class PersonController {
    @GetMapping
    public String hello() {
        return "hello";
    }

    @PostMapping
    public CreatePersonDTO createPerson(@RequestBody CreatePersonDTO createPersonDTO) {
        return createPersonDTO;
    }


}
