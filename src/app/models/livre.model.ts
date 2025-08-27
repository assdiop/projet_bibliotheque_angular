export class Livre {
  id?: number;
  titre?: string;
  genre?: string;
  datePublication?: string;
  disponible?: boolean;
  auteurId?: number;
}


//     @NotBlank(message = "Le titre est obligatoire")
//     @Size(min = 1, max = 200, message = "Le titre doit contenir entre 1 et 200 caractères")
//     private String titre;

//     @Size(max = 100, message = "Le genre ne peut pas dépasser 100 caractères")
//     private String genre;

//     @PastOrPresent(message = "La date de publication ne peut pas être dans le futur")
//     private LocalDate datePublication;

//     private Boolean disponible;

//     @NotNull(message = "L'auteur est obligatoire")
//     @Positive(message = "L'ID de l'auteur doit être positif")
//     private Long auteurId;

//     private String nomAuteur; // Pour l'affichage uniquement
