package com.gerdastan.gerdastan_api.person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository  extends JpaRepository<PersonEntity, Long> {
}
