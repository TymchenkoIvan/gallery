package com.gallery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gallery.entities.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    public Country findByName(String name);
}
