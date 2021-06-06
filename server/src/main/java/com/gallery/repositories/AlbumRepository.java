package com.gallery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gallery.entities.Album;
import com.gallery.entities.Country;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
}
