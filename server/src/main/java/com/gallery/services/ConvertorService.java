package com.gallery.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gallery.dto.AlbumDto;
import com.gallery.dto.CountryDto;
import com.gallery.dto.PhotoDto;
import com.gallery.entities.Album;
import com.gallery.entities.Country;
import com.gallery.entities.Photo;

@Component
public class ConvertorService {

    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    public ConvertorService(ModelMapper modelMapper,
                            ObjectMapper objectMapper) {
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    public CountryDto toDto(Country country) {
        return modelMapper.map(country, CountryDto.class);
    }

    public AlbumDto toDto(Album album) {
        return modelMapper.map(album, AlbumDto.class);
    }

    public PhotoDto toDto(Photo photo) {
        return modelMapper.map(photo, PhotoDto.class);
    }

    public PhotoDto readFromJson(String photoJson) throws JsonProcessingException {
        return objectMapper.readValue(photoJson, PhotoDto.class);
    }

    public Country toEntity(CountryDto countryDto) {
        return modelMapper.map(countryDto, Country.class);
    }

    public Photo toEntity(PhotoDto photoDto) {
        Photo photo = modelMapper.map(photoDto, Photo.class);
        if (photo.getDescription().isEmpty()) {
            photo.setDescription(null);
        }
        return photo;
    }

    public Album toEntity(AlbumDto albumDto) {
        return modelMapper.map(albumDto, Album.class);
    }
}
