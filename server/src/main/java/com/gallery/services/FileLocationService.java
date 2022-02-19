package com.gallery.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Date;

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
public class FileLocationService {

    private final FileSystemRepository fileSystemRepository;
    private final PhotoRepository photoRepository;

    public FileLocationService(FileSystemRepository fileSystemRepository,
                               PhotoRepository photoRepository) {
        this.fileSystemRepository = fileSystemRepository;
        this.photoRepository = photoRepository;
    }

    public Long save(byte[] bytes, Photo photo) throws Exception {
        String location = fileSystemRepository.saveOriginal(bytes, photo.getName());
        String locationThumbnail = fileSystemRepository.saveThumbnail(bytes, photo.getName());
        String locationCrop = fileSystemRepository.saveCrop(bytes, photo.getName());
        Date originalDateTime = executeDateTime(bytes);

        photo.setPhotoLocation(location);
        photo.setThumbnailLocation(locationThumbnail);
        photo.setCropLocation(locationCrop);
        photo.setOriginalDate(originalDateTime);

        return photoRepository.save(photo).getId();
    }

    public FileSystemResource findCroppedPhoto(Long imageId) {
        Photo photo = photoRepository.findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return fileSystemRepository.findInFileSystem(photo.getCropLocation());
    }

    public FileSystemResource findThumbnail(Long imageId) {
        Photo photo = photoRepository.findById(imageId)
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
