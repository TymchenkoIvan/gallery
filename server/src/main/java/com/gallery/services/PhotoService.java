package com.gallery.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.gallery.dto.PhotoDto;
import com.gallery.entities.Album;
import com.gallery.entities.Photo;
import com.gallery.repositories.AlbumRepository;
import com.gallery.repositories.FileSystemRepository;
import com.gallery.repositories.PhotoRepository;

@Component
public class PhotoService {

    private final FileLocationService fileLocationService;
    private final PhotoRepository photoRepository;
    private final AlbumRepository albumRepository;
    private final ConvertorService convertor;

    public PhotoService(PhotoRepository photoRepository,
                        FileLocationService fileLocationService,
                        AlbumRepository albumRepository,
                        ConvertorService convertor,
                        CropPhotoService cropPhotoService,
                        FileSystemRepository fileSystemRepository) {
        this.photoRepository = photoRepository;
        this.convertor = convertor;
        this.fileLocationService = fileLocationService;
        this.albumRepository = albumRepository;
    }

    private List<PhotoDto> getAllPhotosDto() {
        return photoRepository.findByOrderByOriginalDateDesc()
                .stream()
                .map(convertor::toDto)
                .collect(Collectors.toList());
    }

    public List<PhotoDto> getPhotosDto(Boolean isVisible, Boolean isPrivate) {
        return getAllPhotosDto()
                .stream()
                .filter(photoDto -> isVisible == null || photoDto.getIsVisible().equals(isVisible))
                .filter(photoDto -> isPrivate == null || photoDto.getIsPrivate().equals(isPrivate))
                .collect(Collectors.toList());
    }

    public PhotoDto getPhotoDto(Long id) {
        return convertor.toDto(photoRepository.findById(id).orElseThrow(RuntimeException::new));
    }

    public void markPhotoAsVisible(Long id) {
        updatePhotoVisibility(id, true);
    }

    public void markPhotoAsHidden(Long id) {
        updatePhotoVisibility(id, false);
    }

    private void updatePhotoVisibility(Long id, boolean isVisible) {
        Photo photo = photoRepository.findById(id).orElseThrow(RuntimeException::new);
        photo.setVisible(isVisible);
        photoRepository.save(photo);
    }

    public void savePhoto(MultipartFile multipartImage, String photo) throws Exception {
        PhotoDto photoDto = convertor.readFromJson(photo);
        Photo photoEntity = convertor.toEntity(photoDto);
        checkAndAddAlbum(photoDto, photoEntity);

        fileLocationService.save(multipartImage.getBytes(), photoEntity);
    }

    public void updatePhoto(PhotoDto photoDto) {
        Photo photo = photoRepository.findById(photoDto.getId()).orElseThrow(RuntimeException::new);

        photo.setName(photoDto.getName());
        photo.setDescription(photoDto.getDescription());
        photo.setVisible(photoDto.getIsVisible());
        photo.setOriginalDate(photoDto.getOriginalDate());
        checkAndAddAlbum(photoDto, photo);

        photoRepository.save(photo);
    }

    private void checkAndAddAlbum(PhotoDto photoDto, Photo photo) {
        if (photoDto.getAlbumName() != null && !photoDto.getAlbumName().isEmpty()) {
            Album album = albumRepository.findByName(photoDto.getAlbumName());
            if (album == null) {
                throw new RuntimeException("Album " + photoDto.getAlbumName() + " is not found");
            }
            photo.setAlbum(album);
        } else {
            photo.setAlbum(albumRepository.getOne(1L));
        }
    }
}
