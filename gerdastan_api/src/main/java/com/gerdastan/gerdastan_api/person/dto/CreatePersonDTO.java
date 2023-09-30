package com.gerdastan.gerdastan_api.person.dto;

import com.gerdastan.gerdastan_api.person.PersonGender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class CreatePersonDTO {
    private String firstName;
    private String lastName;
    private PersonGender gender;

}
