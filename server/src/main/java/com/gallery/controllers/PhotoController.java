package com.gallery.controllers;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gallery.dto.PhotoDto;
import com.gallery.services.FileLocationService;
import com.gallery.services.PhotoService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/photos")
public class PhotoController {

    private final FileLocationService fileLocationService;
    private final PhotoService photoService;

    public PhotoController(FileLocationService fileLocationService,
                           PhotoService photoService) {
        this.fileLocationService = fileLocationService;
        this.photoService = photoService;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/public")
    public List<PhotoDto> getPublicPhotos() {
        return photoService.getPhotosDto(null, false);
    }

    @GetMapping("/public-visible")
    public List<PhotoDto> getPublicVisiblePhotos() {
        return photoService.getPhotosDto(true, false);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/private")
    public List<PhotoDto> getPrivatePhotos() {
        return photoService.getPhotosDto(null, true);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/private-visible")
    public List<PhotoDto> getPrivateVisiblePhotos() {
        return photoService.getPhotosDto(true, true);
    }

    @GetMapping("/{id}")
    public PhotoDto getPhoto(@PathVariable Long id) {
        return photoService.getPhotoDto(id);
    }

    @GetMapping(value = "/{id}/content", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long id) {
        return fileLocationService.findPhoto(id);
    }

    @GetMapping(value = "/{id}/thumbnail", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadThumbnail(@PathVariable Long id) {
        return fileLocationService.findThumbnail(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    void uploadImage(@RequestPart("file") MultipartFile multipartImage,
                     @RequestPart("dto") String photoDto) throws Exception {
        photoService.savePhoto(multipartImage, photoDto);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody PhotoDto photoDto) throws Exception {
        photoDto.setId(id);
        photoService.updatePhoto(photoDto);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}/hide")
    void markAsHidden(@PathVariable Long id) {
        photoService.markPhotoAsHidden(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}/show")
    void markAsVisible(@PathVariable Long id) {
        photoService.markPhotoAsVisible(id);
    }
}
