package com.gallery.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gallery.dto.CountryDto;
import com.gallery.entities.Country;
import com.gallery.repositories.CountryRepository;
import com.gallery.services.ConvertorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/countries")
public class CountryController {

    private CountryRepository countryRepository;

    private ConvertorService convertor;

    public CountryController(CountryRepository countryRepository,
                             ConvertorService convertor) {
        this.countryRepository = countryRepository;
        this.convertor = convertor;
    }

    @GetMapping()
    public List<CountryDto> getAll() {
        return countryRepository.findAll()
                .stream()
                .map(country -> convertor.toDto(country))
                .collect(Collectors.toList());
    }

    @PostMapping()
    public void create(@RequestBody CountryDto countryDto) {
        countryRepository.save(convertor.toEntity(countryDto));
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody CountryDto countryDto) {
        Country country = countryRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
        country.setName(countryDto.getName());
        countryRepository.save(country);
    }

    @DeleteMapping("/{id}")
    public void getCountries(@PathVariable Long id) {
        countryRepository.delete(countryRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new));
    }
}
