const words = [
    {
      "spanish": "gato",
      "english": "cat",
      "type": "noun"
    },
    {
      "spanish": "perro",
      "english": "dog",
      "type": "noun"
    },
    {
      "spanish": "casa",
      "english": "house",
      "type": "noun"
    },
    {
      "spanish": "sol",
      "english": "sun",
      "type": "noun"
    },
    {
      "spanish": "luna",
      "english": "moon",
      "type": "noun"
    },
    {
      "spanish": "rojo",
      "english": "red",
      "type": "adjective"
    },
    {
      "spanish": "azul",
      "english": "blue",
      "type": "adjective"
    },
    {
      "spanish": "verde",
      "english": "green",
      "type": "adjective"
    },
    {
      "spanish": "amarillo",
      "english": "yellow",
      "type": "adjective"
    },
    {
      "spanish": "feliz",
      "english": "happy",
      "type": "adjective"
    },
    {
      "spanish": "triste",
      "english": "sad",
      "type": "adjective"
    },
    {
      "spanish": "rápido",
      "english": "fast",
      "type": "adjective"
    },
    {
      "spanish": "lento",
      "english": "slow",
      "type": "adjective"
    },
    {
      "spanish": "amigo",
      "english": "friend",
      "type": "noun"
    },
    {
      "spanish": "amor",
      "english": "love",
      "type": "noun"
    },
    {
      "spanish": "libro",
      "english": "book",
      "type": "noun"
    },
    {
      "spanish": "mesa",
      "english": "table",
      "type": "noun"
    },
    {
      "spanish": "silla",
      "english": "chair",
      "type": "noun"
    },
    {
      "spanish": "playa",
      "english": "beach",
      "type": "noun"
    },
    {
      "spanish": "ciudad",
      "english": "city",
      "type": "noun"
    },
    {
      "spanish": "montaña",
      "english": "mountain",
      "type": "noun"
    },
    {
      "spanish": "jardín",
      "english": "garden",
      "type": "noun"
    },
    {
      "spanish": "fuerte",
      "english": "strong",
      "type": "adjective"
    },
    {
      "spanish": "débil",
      "english": "weak",
      "type": "adjective"
    },
    {
      "spanish": "nuevo",
      "english": "new",
      "type": "adjective"
    },
    {
      "spanish": "viejo",
      "english": "old",
      "type": "adjective"
    },
    {
      "spanish": "agua",
      "english": "water",
      "type": "noun"
    },
    {
      "spanish": "fuego",
      "english": "fire",
      "type": "noun"
    },
    {
      "spanish": "aire",
      "english": "air",
      "type": "noun"
    },
    {
      "spanish": "tierra",
      "english": "earth",
      "type": "noun"
    },
    {
      "spanish": "manzana",
      "english": "apple",
      "type": "noun"
    },
    {
      "spanish": "fruta",
      "english": "fruit",
      "type": "noun"
    },
    {
      "spanish": "carro",
      "english": "car",
      "type": "noun"
    },
    {
      "spanish": "bicicleta",
      "english": "bicycle",
      "type": "noun"
    },
    {
      "spanish": "viaje",
      "english": "trip",
      "type": "noun"
    },
    {
      "spanish": "trabajo",
      "english": "work",
      "type": "noun"
    },
    {
      "spanish": "escuela",
      "english": "school",
      "type": "noun"
    },
    {
      "spanish": "estudiante",
      "english": "student",
      "type": "noun"
    },
    {
      "spanish": "profesor",
      "english": "teacher",
      "type": "noun"
    },
    {
      "spanish": "doctor",
      "english": "doctor",
      "type": "noun"
    },
    {
      "spanish": "enfermedad",
      "english": "illness",
      "type": "noun"
    },
    {
      "spanish": "dinero",
      "english": "money",
      "type": "noun"
    },
    {
      "spanish": "precio",
      "english": "price",
      "type": "noun"
    },
    {
      "spanish": "dolor",
      "english": "pain",
      "type": "noun"
    },
    {
      "spanish": "sueño",
      "english": "dream",
      "type": "noun"
    },
    {
      "spanish": "familia",
      "english": "family",
      "type": "noun"
    },
    {
      "spanish": "comida",
      "english": "food",
      "type": "noun"
    },
    {
      "spanish": "ropa",
      "english": "clothing",
      "type": "noun"
    },
    {
      "spanish": "musica",
      "english": "music",
      "type": "noun"
    },
    {
      "spanish": "arte",
      "english": "art",
      "type": "noun"
    },
    {
      "spanish": "verano",
      "english": "summer",
      "type": "noun"
    },
    {
      "spanish": "invierno",
      "english": "winter",
      "type": "noun"
    },
    {
      "spanish": "otoño",
      "english": "autumn",
      "type": "noun"
    },
    {
      "spanish": "primavera",
      "english": "spring",
      "type": "noun"
    },
    {
      "spanish": "hermano",
      "english": "brother",
      "type": "noun"
    },
    {
      "spanish": "hermana",
      "english": "sister",
      "type": "noun"
    },
    {
      "spanish": "padre",
      "english": "father",
      "type": "noun"
    },
    {
      "spanish": "madre",
      "english": "mother",
      "type": "noun"
    },
    {
      "spanish": "hijo",
      "english": "son",
      "type": "noun"
    },
    {
      "spanish": "hija",
      "english": "daughter",
      "type": "noun"
    },
    {
      "spanish": "canción",
      "english": "song",
      "type": "noun"
    },
    {
      "spanish": "pintura",
      "english": "painting",
      "type": "noun"
    },
    {
      "spanish": "película",
      "english": "movie",
      "type": "noun"
    },
    {
      "spanish": "teléfono",
      "english": "phone",
      "type": "noun"
    },
    {
      "spanish": "computadora",
      "english": "computer",
      "type": "noun"
    },
    {
      "spanish": "frío",
      "english": "cold",
      "type": "adjective"
    },
    {
      "spanish": "caliente",
      "english": "hot",
      "type": "adjective"
    },
    {
      "spanish": "lugar",
      "english": "place",
      "type": "noun"
    },
    {
      "spanish": "persona",
      "english": "person",
      "type": "noun"
    },
    {
      "spanish": "cielo",
      "english": "sky",
      "type": "noun"
    },
    {
      "spanish": "nube",
      "english": "cloud",
      "type": "noun"
    },
    {
      "spanish": "amable",
      "english": "kind",
      "type": "adjective"
    },
    {
      "spanish": "cruel",
      "english": "cruel",
      "type": "adjective"
    },
    {
      "spanish": "rápido",
      "english": "quick",
      "type": "adjective"
    },
    {
      "spanish": "largo",
      "english": "long",
      "type": "adjective"
    },
    {
      "spanish": "corto",
      "english": "short",
      "type": "adjective"
    },
    {
      "spanish": "alto",
      "english": "tall",
      "type": "adjective"
    },
    {
      "spanish": "bajo",
      "english": "short",
      "type": "adjective"
    },
    {
      "spanish": "grande",
      "english": "big",
      "type": "adjective"
    },
    {
      "spanish": "pequeño",
      "english": "small",
      "type": "adjective"
    },
    {
      "spanish": "cierto",
      "english": "true",
      "type": "adjective"
    },
    {
      "spanish": "falso",
      "english": "false",
      "type": "adjective"
    },
    {
      "spanish": "hermoso",
      "english": "beautiful",
      "type": "adjective"
    },
    {
      "spanish": "feo",
      "english": "ugly",
      "type": "adjective"
    },
    {
      "spanish": "rico",
      "english": "rich",
      "type": "adjective"
    },
    {
      "spanish": "pobre",
      "english": "poor",
      "type": "adjective"
    },
    {
      "spanish": "feliz",
      "english": "happy",
      "type": "adjective"
    },
    {
      "spanish": "enojado",
      "english": "angry",
      "type": "adjective"
    },
    {
      "spanish": "sorpresa",
      "english": "surprise",
      "type": "noun"
    },
    {
      "spanish": "miedo",
      "english": "fear",
      "type": "noun"
    },
    {
      "spanish": "sabor",
      "english": "taste",
      "type": "noun"
    },
    {
      "spanish": "olor",
      "english": "smell",
      "type": "noun"
    }
  ]

module.exports = { words }