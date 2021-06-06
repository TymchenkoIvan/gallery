package com.gallery.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gallery.dto.AlbumDto;
import com.gallery.dto.CountryDto;
import com.gallery.entities.Album;
import com.gallery.entities.Country;

@Component
public class ConvertorService {

    @Autowired
    private ModelMapper modelMapper;

    public CountryDto toDto(Country country) {
        return modelMapper.map(country, CountryDto.class);
    }

    public AlbumDto toDto(Album album) {
        return modelMapper.map(album, AlbumDto.class);
    }

    public Country toEntity(CountryDto countryDto) {
        return modelMapper.map(countryDto, Country.class);
    }
}
