package com.baeldung.application.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.baeldung.application.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    User findByName(String name);
}
