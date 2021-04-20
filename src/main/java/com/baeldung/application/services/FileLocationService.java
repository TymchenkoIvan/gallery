package com.baeldung.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.baeldung.application.entities.Photo;
import com.baeldung.application.repositories.FileSystemRepository;
import com.baeldung.application.repositories.PhotoRepository;

@Service
public
class FileLocationService {

    @Autowired
    private FileSystemRepository fileSystemRepository;

    @Autowired
    private PhotoRepository imageDbRepository;

    public Long save(byte[] bytes, String imageName) throws Exception {
        String location = fileSystemRepository.saveOriginal(bytes, imageName);
        String locationThumbnail = fileSystemRepository.saveThumbnail(bytes, imageName);

        return imageDbRepository.save(new Photo(imageName, location, locationThumbnail))
                .getId();
    }

    public FileSystemResource findPhoto(Long imageId) {
        Photo photo = imageDbRepository.findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return fileSystemRepository.findInFileSystem(photo.getPhotoLocation());
    }

    public FileSystemResource findThumbnail(Long imageId) {
        Photo photo = imageDbRepository.findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return fileSystemRepository.findInFileSystem(photo.getThumbnailLocation());
    }
}
