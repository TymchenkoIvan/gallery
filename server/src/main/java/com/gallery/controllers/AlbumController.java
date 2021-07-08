package com.gallery.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gallery.dto.AlbumDto;
import com.gallery.entities.Album;
import com.gallery.entities.Country;
import com.gallery.exception.EntityDeleteConflictException;
import com.gallery.repositories.AlbumRepository;
import com.gallery.repositories.CountryRepository;
import com.gallery.services.ConvertorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumRepository albumRepository;
    private final CountryRepository countryRepository;
    private final ConvertorService convertor;

    public AlbumController(AlbumRepository albumRepository,
                           CountryRepository countryRepository,
                           ConvertorService convertor) {
        this.albumRepository = albumRepository;
        this.convertor = convertor;
        this.countryRepository = countryRepository;
    }

    @GetMapping()
    public List<AlbumDto> getAll() {
        return albumRepository.findAll()
                .stream()
                .map(convertor::toDto)
                .collect(Collectors.toList());
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping()
    public void create(@RequestBody AlbumDto albumDto) {
        Album album = convertor.toEntity(albumDto);
        Country country = countryRepository.findByName(albumDto.getCountryName());
        album.setCountry(country);
        albumRepository.save(album);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody AlbumDto albumDto) {
        Album album = albumRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);

        Country country = countryRepository.findByName(albumDto.getCountryName());
        album.setName(albumDto.getName());
        album.setDescription(albumDto.getDescription());
        album.setCountry(country);
        albumRepository.save(album);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Album album = albumRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);

        if (!album.getPhotos().isEmpty()) {
            throw new EntityDeleteConflictException("You can't delete Album with related Photos");
        } else {
            albumRepository.delete(album);
        }
    }
}
