package com.gallery.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gallery.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    User findByName(String name);
}
