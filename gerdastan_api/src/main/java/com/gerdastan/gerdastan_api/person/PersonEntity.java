package com.gerdastan.gerdastan_api.person;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class PersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "about", length = 500)
    private String about;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Enumerated
    @Column(name = "gender")
    private PersonGender gender;


    @Column(name = "wife_or_husband")
    private String wifeOrHusband;

    @Column(name = "died", length = 10)
    private String died;

    @Column(name = "birthday", length = 10)
    private String  birthday;

    @OneToMany(targetEntity = PersonFile.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "pf")
    @ToString.Exclude
    private List<PersonFile> files;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PersonEntity that = (PersonEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
