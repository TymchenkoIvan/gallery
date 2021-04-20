package com.baeldung.application.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.baeldung.application.entities.Photo;

@Repository
public interface PhotoRepository extends CrudRepository<Photo, Long>{
    List<Photo> findByOrderByIdDesc();
}
