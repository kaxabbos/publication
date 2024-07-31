package com.services.publicationApplication;

import com.services.appUser.AppUser;
import com.services.enums.PublicationApplicationStatus;
import com.services.publication.Publication;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PublicationApplication {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "publication_application_g")
    @SequenceGenerator(name = "publication_application_g", sequenceName = "publication_application_seq", allocationSize = 1)
    private Long id;

    @Column(length = 5000)
    private String description;

    @Enumerated(EnumType.STRING)
    private PublicationApplicationStatus status = PublicationApplicationStatus.WAITING;

    @ManyToOne
    private Publication publication;
    @ManyToOne
    private AppUser owner;

    public PublicationApplication(String description, Publication publication, AppUser owner) {
        this.description = description;
        this.publication = publication;
        this.owner = owner;
    }
}
