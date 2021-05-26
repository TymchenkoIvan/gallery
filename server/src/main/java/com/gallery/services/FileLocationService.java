package com.gallery.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.gallery.entities.Photo;
import com.gallery.repositories.FileSystemRepository;
import com.gallery.repositories.PhotoRepository;

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
        Date originalDateTime = executeDateTime(bytes);

        return imageDbRepository.save(new Photo(imageName, location, locationThumbnail, originalDateTime))
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

    private Date executeDateTime(byte[] bytes) throws ImageProcessingException, IOException {
        Date originalDateTime = executeOriginalDateTime(bytes);
        return originalDateTime == null
                ? new Date()
                : originalDateTime;
    }

    private Date executeOriginalDateTime(byte[] bytes) throws ImageProcessingException, IOException {
        Metadata metadata = ImageMetadataReader.readMetadata(new ByteArrayInputStream(bytes));
        ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
        return directory == null
                ? null
                : directory.getDateOriginal();
    }
}
