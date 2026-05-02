import { useState, useCallback } from “react”;

// ─── REAL STICKER DATABASE ─────────────────────────────────────────────────
const STICKER_DB = [
{ id: “00”, name: “Panini Logo”, team: “Especial” },
{ id: “FWC-1”, name: “Emblema Oficial 1/2”, team: “Especial” },
{ id: “FWC-2”, name: “Emblema Oficial 2/2”, team: “Especial” },
{ id: “FWC-3”, name: “Mascotas Oficiales”, team: “Especial” },
{ id: “FWC-4”, name: “Slogan Oficial”, team: “Especial” },
{ id: “FWC-5”, name: “Balón Oficial”, team: “Especial” },
{ id: “FWC-6”, name: “Canadá (País Anfitrión)”, team: “Especial” },
{ id: “FWC-7”, name: “México (País Anfitrión)”, team: “Especial” },
{ id: “FWC-8”, name: “USA (País Anfitrión)”, team: “Especial” },
{ id: “ALG-1”, name: “Escudo (Argelia)”, team: “Argelia” },
{ id: “ALG-2”, name: “Alexis Guendouz”, team: “Argelia” },
{ id: “ALG-3”, name: “Ramy Bensebaini”, team: “Argelia” },
{ id: “ALG-4”, name: “Youcef Atal”, team: “Argelia” },
{ id: “ALG-5”, name: “Rayan Aït-Nouri”, team: “Argelia” },
{ id: “ALG-6”, name: “Mohamed Amine Tougai”, team: “Argelia” },
{ id: “ALG-7”, name: “Aïssa Mandi”, team: “Argelia” },
{ id: “ALG-8”, name: “Ismael Bennacer”, team: “Argelia” },
{ id: “ALG-9”, name: “Houssem Aquar”, team: “Argelia” },
{ id: “ALG-10”, name: “Hicham Boudaoui”, team: “Argelia” },
{ id: “ALG-11”, name: “Ramiz Zerrouki”, team: “Argelia” },
{ id: “ALG-12”, name: “Nabil Bentalab”, team: “Argelia” },
{ id: “ALG-13”, name: “Foto del Equipo (Argelia)”, team: “Argelia” },
{ id: “ALG-14”, name: “Farés Chaibi”, team: “Argelia” },
{ id: “ALG-15”, name: “Riyad Mahrez”, team: “Argelia” },
{ id: “ALG-16”, name: “Said Benrhama”, team: “Argelia” },
{ id: “ALG-17”, name: “Anis Hadj Moussa”, team: “Argelia” },
{ id: “ALG-18”, name: “Amine Gouiri”, team: “Argelia” },
{ id: “ALG-19”, name: “Baghdad Bounedjah”, team: “Argelia” },
{ id: “ALG-20”, name: “Mohammed Amoura”, team: “Argelia” },
{ id: “ARG-1”, name: “Escudo (Argentina)”, team: “Argentina” },
{ id: “ARG-2”, name: “Emiliano Martinez”, team: “Argentina” },
{ id: “ARG-3”, name: “Nahuel Molina”, team: “Argentina” },
{ id: “ARG-4”, name: “Cristian Romero”, team: “Argentina” },
{ id: “ARG-5”, name: “Nicolas Otamendi”, team: “Argentina” },
{ id: “ARG-6”, name: “Nicolas Tagliafico”, team: “Argentina” },
{ id: “ARG-7”, name: “Leonardo Balerdi”, team: “Argentina” },
{ id: “ARG-8”, name: “Enzo Fernandez”, team: “Argentina” },
{ id: “ARG-9”, name: “Alexis Mac Allister”, team: “Argentina” },
{ id: “ARG-10”, name: “Rodrigo De Paul”, team: “Argentina” },
{ id: “ARG-11”, name: “Exequiel Palacios”, team: “Argentina” },
{ id: “ARG-12”, name: “Leandro Paredes”, team: “Argentina” },
{ id: “ARG-13”, name: “Foto del Equipo (Argentina)”, team: “Argentina” },
{ id: “ARG-14”, name: “Nico Paz”, team: “Argentina” },
{ id: “ARG-15”, name: “Franco Mastantuono”, team: “Argentina” },
{ id: “ARG-16”, name: “Nico Gonzalez”, team: “Argentina” },
{ id: “ARG-17”, name: “Lionel Messi”, team: “Argentina” },
{ id: “ARG-18”, name: “Lautaro Martinez”, team: “Argentina” },
{ id: “ARG-19”, name: “Julian Alvarez”, team: “Argentina” },
{ id: “ARG-20”, name: “Giuliano Simeone”, team: “Argentina” },
{ id: “AUS-1”, name: “Escudo (Australia)”, team: “Australia” },
{ id: “AUS-2”, name: “Mathew Ryan”, team: “Australia” },
{ id: “AUS-3”, name: “Joe Gauci”, team: “Australia” },
{ id: “AUS-4”, name: “Harry Souttar”, team: “Australia” },
{ id: “AUS-5”, name: “Alessandro Circati”, team: “Australia” },
{ id: “AUS-6”, name: “Jordan Bos”, team: “Australia” },
{ id: “AUS-7”, name: “Aziz Behich”, team: “Australia” },
{ id: “AUS-8”, name: “Cameron Burgess”, team: “Australia” },
{ id: “AUS-9”, name: “Lewis Miller”, team: “Australia” },
{ id: “AUS-10”, name: “Milos Degenek”, team: “Australia” },
{ id: “AUS-11”, name: “Jackson Irvine”, team: “Australia” },
{ id: “AUS-12”, name: “Riley McGree”, team: “Australia” },
{ id: “AUS-13”, name: “Foto del Equipo (Australia)”, team: “Australia” },
{ id: “AUS-14”, name: “Aiden O'Neill”, team: “Australia” },
{ id: “AUS-15”, name: “Connor Metcalfe”, team: “Australia” },
{ id: “AUS-16”, name: “Patrick Yazbek”, team: “Australia” },
{ id: “AUS-17”, name: “Craig Goodwin”, team: “Australia” },
{ id: “AUS-18”, name: “Kusini Vengi”, team: “Australia” },
{ id: “AUS-19”, name: “Nestory Irankunda”, team: “Australia” },
{ id: “AUS-20”, name: “Mohamed Touré”, team: “Australia” },
{ id: “AUT-1”, name: “Escudo (Austria)”, team: “Austria” },
{ id: “AUT-2”, name: “Alexander Schlager”, team: “Austria” },
{ id: “AUT-3”, name: “Patrick Pentz”, team: “Austria” },
{ id: “AUT-4”, name: “David Alaba”, team: “Austria” },
{ id: “AUT-5”, name: “Kevin Danso”, team: “Austria” },
{ id: “AUT-6”, name: “Philipp Lienhart”, team: “Austria” },
{ id: “AUT-7”, name: “Stefan Bosch”, team: “Austria” },
{ id: “AUT-8”, name: “Phillipp Mwene”, team: “Austria” },
{ id: “AUT-9”, name: “Alexander Prass”, team: “Austria” },
{ id: “AUT-10”, name: “Xavier Schlager”, team: “Austria” },
{ id: “AUT-11”, name: “Marcel Sabitzer”, team: “Austria” },
{ id: “AUT-12”, name: “Konrad Laimer”, team: “Austria” },
{ id: “AUT-13”, name: “Foto del Equipo (Austria)”, team: “Austria” },
{ id: “AUT-14”, name: “Florian Grillitsch”, team: “Austria” },
{ id: “AUT-15”, name: “Nicolas Seiwald”, team: “Austria” },
{ id: “AUT-16”, name: “Romano Schmid”, team: “Austria” },
{ id: “AUT-17”, name: “Patrick Wimmer”, team: “Austria” },
{ id: “AUT-18”, name: “Christoph Baumgartner”, team: “Austria” },
{ id: “AUT-19”, name: “Michael Gregoritsch”, team: “Austria” },
{ id: “AUT-20”, name: “Marko Arnautovic”, team: “Austria” },
{ id: “BEL-1”, name: “Escudo (Bélgica)”, team: “Bélgica” },
{ id: “BEL-2”, name: “Thibaut Courtois”, team: “Bélgica” },
{ id: “BEL-3”, name: “Arthur Theate”, team: “Bélgica” },
{ id: “BEL-4”, name: “Timothy Castagne”, team: “Bélgica” },
{ id: “BEL-5”, name: “Zeno Debast”, team: “Bélgica” },
{ id: “BEL-6”, name: “Brandon Mechele”, team: “Bélgica” },
{ id: “BEL-7”, name: “Maxim De Cuyper”, team: “Bélgica” },
{ id: “BEL-8”, name: “Thomas Meunier”, team: “Bélgica” },
{ id: “BEL-9”, name: “Youri Tielemans”, team: “Bélgica” },
{ id: “BEL-10”, name: “Amadou Onana”, team: “Bélgica” },
{ id: “BEL-11”, name: “Nicolas Raskin”, team: “Bélgica” },
{ id: “BEL-12”, name: “Alexis Saelemaekers”, team: “Bélgica” },
{ id: “BEL-13”, name: “Foto del Equipo (Bélgica)”, team: “Bélgica” },
{ id: “BEL-14”, name: “Hans Vanaken”, team: “Bélgica” },
{ id: “BEL-15”, name: “Kevin De Bruyne”, team: “Bélgica” },
{ id: “BEL-16”, name: “Jérémy Doku”, team: “Bélgica” },
{ id: “BEL-17”, name: “Charles De Ketelaere”, team: “Bélgica” },
{ id: “BEL-18”, name: “Leandro Trossard”, team: “Bélgica” },
{ id: “BEL-19”, name: “Loïs Openda”, team: “Bélgica” },
{ id: “BEL-20”, name: “Romelu Lukaku”, team: “Bélgica” },
{ id: “BIH-1”, name: “Escudo (Bosnia)”, team: “Bosnia” },
{ id: “BIH-2”, name: “Nikola Vasilj”, team: “Bosnia” },
{ id: “BIH-3”, name: “Amer Dedic”, team: “Bosnia” },
{ id: “BIH-4”, name: “Sead Kolasinac”, team: “Bosnia” },
{ id: “BIH-5”, name: “Tarik Muharemovic”, team: “Bosnia” },
{ id: “BIH-6”, name: “Nihad Mujakic”, team: “Bosnia” },
{ id: “BIH-7”, name: “Nikola Katic”, team: “Bosnia” },
{ id: “BIH-8”, name: “Amir Hadziahmetovic”, team: “Bosnia” },
{ id: “BIH-9”, name: “Benjamin Tahirovic”, team: “Bosnia” },
{ id: “BIH-10”, name: “Armin Gigovic”, team: “Bosnia” },
{ id: “BIH-11”, name: “Ivan Sunjic”, team: “Bosnia” },
{ id: “BIH-12”, name: “Ivan Basic”, team: “Bosnia” },
{ id: “BIH-13”, name: “Foto del Equipo (Bosnia)”, team: “Bosnia” },
{ id: “BIH-14”, name: “Dzenis Burnic”, team: “Bosnia” },
{ id: “BIH-15”, name: “Esmir Bajraktarevic”, team: “Bosnia” },
{ id: “BIH-16”, name: “Amar Memic”, team: “Bosnia” },
{ id: “BIH-17”, name: “Ermedin Demirovic”, team: “Bosnia” },
{ id: “BIH-18”, name: “Edin Dzeko”, team: “Bosnia” },
{ id: “BIH-19”, name: “Samed Bazdar”, team: “Bosnia” },
{ id: “BIH-20”, name: “Haris Tabakovic”, team: “Bosnia” },
{ id: “BRA-1”, name: “Escudo (Brasil)”, team: “Brasil” },
{ id: “BRA-2”, name: “Alisson”, team: “Brasil” },
{ id: “BRA-3”, name: “Bento”, team: “Brasil” },
{ id: “BRA-4”, name: “Marquinhos”, team: “Brasil” },
{ id: “BRA-5”, name: “Éder Militão”, team: “Brasil” },
{ id: “BRA-6”, name: “Gabriel Magalhães”, team: “Brasil” },
{ id: “BRA-7”, name: “Danilo”, team: “Brasil” },
{ id: “BRA-8”, name: “Wesley”, team: “Brasil” },
{ id: “BRA-9”, name: “Lucas Paquetá”, team: “Brasil” },
{ id: “BRA-10”, name: “Casemiro”, team: “Brasil” },
{ id: “BRA-11”, name: “Bruno Guimarães”, team: “Brasil” },
{ id: “BRA-12”, name: “Luiz Henrique”, team: “Brasil” },
{ id: “BRA-13”, name: “Foto del Equipo (Brasil)”, team: “Brasil” },
{ id: “BRA-14”, name: “Vinicius Júnior”, team: “Brasil” },
{ id: “BRA-15”, name: “Rodrygo”, team: “Brasil” },
{ id: “BRA-16”, name: “João Pedro”, team: “Brasil” },
{ id: “BRA-17”, name: “Matheus Cunha”, team: “Brasil” },
{ id: “BRA-18”, name: “Gabriel Martinelli”, team: “Brasil” },
{ id: “BRA-19”, name: “Raphinha”, team: “Brasil” },
{ id: “BRA-20”, name: “Estévão”, team: “Brasil” },
{ id: “CAN-1”, name: “Escudo (Canadá)”, team: “Canadá” },
{ id: “CAN-2”, name: “Dayne St.Clair”, team: “Canadá” },
{ id: “CAN-3”, name: “Alphonso Davies”, team: “Canadá” },
{ id: “CAN-4”, name: “Alistair Johnston”, team: “Canadá” },
{ id: “CAN-5”, name: “Samuel Adekugbe”, team: “Canadá” },
{ id: “CAN-6”, name: “Riche Larvea”, team: “Canadá” },
{ id: “CAN-7”, name: “Derek Cornelius”, team: “Canadá” },
{ id: “CAN-8”, name: “Moïse Bombito”, team: “Canadá” },
{ id: “CAN-9”, name: “Kamal Miller”, team: “Canadá” },
{ id: “CAN-10”, name: “Stephen Eustáquio”, team: “Canadá” },
{ id: “CAN-11”, name: “Ismaël Koné”, team: “Canadá” },
{ id: “CAN-12”, name: “Jonathan Osorio”, team: “Canadá” },
{ id: “CAN-13”, name: “Foto del Equipo (Canadá)”, team: “Canadá” },
{ id: “CAN-14”, name: “Jacob Shaffelburg”, team: “Canadá” },
{ id: “CAN-15”, name: “Mathieu Choinière”, team: “Canadá” },
{ id: “CAN-16”, name: “Niko Sigur”, team: “Canadá” },
{ id: “CAN-17”, name: “Tajon Buchanan”, team: “Canadá” },
{ id: “CAN-18”, name: “Liam Millar”, team: “Canadá” },
{ id: “CAN-19”, name: “Cyle Larin”, team: “Canadá” },
{ id: “CAN-20”, name: “Jonathan David”, team: “Canadá” },
{ id: “CIV-1”, name: “Escudo (C. de Marfil)”, team: “C. de Marfil” },
{ id: “CIV-2”, name: “Yahia Fofana”, team: “C. de Marfil” },
{ id: “CIV-3”, name: “Ghislain Konan”, team: “C. de Marfil” },
{ id: “CIV-4”, name: “Wilfried Singo”, team: “C. de Marfil” },
{ id: “CIV-5”, name: “Odilon Kossounou”, team: “C. de Marfil” },
{ id: “CIV-6”, name: “Evan Ndicka”, team: “C. de Marfil” },
{ id: “CIV-7”, name: “Willy Boly”, team: “C. de Marfil” },
{ id: “CIV-8”, name: “Emmanuel Agbadou”, team: “C. de Marfil” },
{ id: “CIV-9”, name: “Ousmane Diomande”, team: “C. de Marfil” },
{ id: “CIV-10”, name: “Franck Kessie”, team: “C. de Marfil” },
{ id: “CIV-11”, name: “Seko Fofana”, team: “C. de Marfil” },
{ id: “CIV-12”, name: “Ibrahim Sangare”, team: “C. de Marfil” },
{ id: “CIV-13”, name: “Foto del Equipo (C. de Marfil)”, team: “C. de Marfil” },
{ id: “CIV-14”, name: “Jean-Philippe Gbamin”, team: “C. de Marfil” },
{ id: “CIV-15”, name: “Amad Diallo”, team: “C. de Marfil” },
{ id: “CIV-16”, name: “Sébastien Haller”, team: “C. de Marfil” },
{ id: “CIV-17”, name: “Simon Adringa”, team: “C. de Marfil” },
{ id: “CIV-18”, name: “Yan Diomande”, team: “C. de Marfil” },
{ id: “CIV-19”, name: “Evann Guessand”, team: “C. de Marfil” },
{ id: “CIV-20”, name: “Oumar Diakite”, team: “C. de Marfil” },
{ id: “COD-1”, name: “Escudo (RD Congo)”, team: “RD Congo” },
{ id: “COD-2”, name: “Lionel Mpasi”, team: “RD Congo” },
{ id: “COD-3”, name: “Aaron Wan-Bissaka”, team: “RD Congo” },
{ id: “COD-4”, name: “Axel Tuanzebe”, team: “RD Congo” },
{ id: “COD-5”, name: “Arthur Masuaku”, team: “RD Congo” },
{ id: “COD-6”, name: “Chancel Mbemba”, team: “RD Congo” },
{ id: “COD-7”, name: “Joris Kayembe”, team: “RD Congo” },
{ id: “COD-8”, name: “Charles Pickel”, team: “RD Congo” },
{ id: “COD-9”, name: “Ngal'ayel Mukau”, team: “RD Congo” },
{ id: “COD-10”, name: “Edo Kayembe”, team: “RD Congo” },
{ id: “COD-11”, name: “Samuel Moutoussamy”, team: “RD Congo” },
{ id: “COD-12”, name: “Noah Sadiki”, team: “RD Congo” },
{ id: “COD-13”, name: “Foto del Equipo (RD Congo)”, team: “RD Congo” },
{ id: “COD-14”, name: “Théo Bongonda”, team: “RD Congo” },
{ id: “COD-15”, name: “Meschak Elia”, team: “RD Congo” },
{ id: “COD-16”, name: “Yoane Wissa”, team: “RD Congo” },
{ id: “COD-17”, name: “Brian Cipenga”, team: “RD Congo” },
{ id: “COD-18”, name: “Fiston Mayele”, team: “RD Congo” },
{ id: “COD-19”, name: “Cédric Bakambu”, team: “RD Congo” },
{ id: “COD-20”, name: “Nathanaël Mbuku”, team: “RD Congo” },
{ id: “COL-1”, name: “Escudo (Colombia)”, team: “Colombia” },
{ id: “COL-2”, name: “Camilo Vargas”, team: “Colombia” },
{ id: “COL-3”, name: “David Ospina”, team: “Colombia” },
{ id: “COL-4”, name: “Dávinson Sánchez”, team: “Colombia” },
{ id: “COL-5”, name: “Yerry Mina”, team: “Colombia” },
{ id: “COL-6”, name: “Daniel Munoz”, team: “Colombia” },
{ id: “COL-7”, name: “Johan Mojica”, team: “Colombia” },
{ id: “COL-8”, name: “Jhon Lucumí”, team: “Colombia” },
{ id: “COL-9”, name: “Santiago Arias”, team: “Colombia” },
{ id: “COL-10”, name: “Jefferson Lerma”, team: “Colombia” },
{ id: “COL-11”, name: “Kevin Castaño”, team: “Colombia” },
{ id: “COL-12”, name: “Richard Rios”, team: “Colombia” },
{ id: “COL-13”, name: “Foto del Equipo (Colombia)”, team: “Colombia” },
{ id: “COL-14”, name: “James Rodriguez”, team: “Colombia” },
{ id: “COL-15”, name: “Juan Fernando Quintero”, team: “Colombia” },
{ id: “COL-16”, name: “Jorge Carrascal”, team: “Colombia” },
{ id: “COL-17”, name: “Jhon Arias”, team: “Colombia” },
{ id: “COL-18”, name: “Jhon Cordova”, team: “Colombia” },
{ id: “COL-19”, name: “Luis Suarez”, team: “Colombia” },
{ id: “COL-20”, name: “Luis Diaz”, team: “Colombia” },
{ id: “CPV-1”, name: “Escudo (Cabo Verde)”, team: “Cabo Verde” },
{ id: “CPV-2”, name: “Vozinha”, team: “Cabo Verde” },
{ id: “CPV-3”, name: “Logan Costa”, team: “Cabo Verde” },
{ id: “CPV-4”, name: “Pico”, team: “Cabo Verde” },
{ id: “CPV-5”, name: “Diney”, team: “Cabo Verde” },
{ id: “CPV-6”, name: “Steven Moreira”, team: “Cabo Verde” },
{ id: “CPV-7”, name: “Wagner Pina”, team: “Cabo Verde” },
{ id: “CPV-8”, name: “Joao Paulo”, team: “Cabo Verde” },
{ id: “CPV-9”, name: “Yannick Semedo”, team: “Cabo Verde” },
{ id: “CPV-10”, name: “Kevin Pina”, team: “Cabo Verde” },
{ id: “CPV-11”, name: “Patrick Andrade”, team: “Cabo Verde” },
{ id: “CPV-12”, name: “Jamiro Monteiro”, team: “Cabo Verde” },
{ id: “CPV-13”, name: “Foto del Equipo (Cabo Verde)”, team: “Cabo Verde” },
{ id: “CPV-14”, name: “Deroy Duarte”, team: “Cabo Verde” },
{ id: “CPV-15”, name: “Garry Rodrigues”, team: “Cabo Verde” },
{ id: “CPV-16”, name: “Jovane Cabral”, team: “Cabo Verde” },
{ id: “CPV-17”, name: “Ryan Mendes”, team: “Cabo Verde” },
{ id: “CPV-18”, name: “Dailon Livramento”, team: “Cabo Verde” },
{ id: “CPV-19”, name: “Willy Semedo”, team: “Cabo Verde” },
{ id: “CPV-20”, name: “Bebe”, team: “Cabo Verde” },
{ id: “CRO-1”, name: “Escudo (Croacia)”, team: “Croacia” },
{ id: “CRO-2”, name: “Dominik Livaković”, team: “Croacia” },
{ id: “CRO-3”, name: “Duje Caleta-Car”, team: “Croacia” },
{ id: “CRO-4”, name: “Josko Gvardiol”, team: “Croacia” },
{ id: “CRO-5”, name: “Josip Stanišić”, team: “Croacia” },
{ id: “CRO-6”, name: “Luka Vušković”, team: “Croacia” },
{ id: “CRO-7”, name: “Josip Sutalo”, team: “Croacia” },
{ id: “CRO-8”, name: “Kristijan Jakic”, team: “Croacia” },
{ id: “CRO-9”, name: “Luka Modrić”, team: “Croacia” },
{ id: “CRO-10”, name: “Mateo Kovacic”, team: “Croacia” },
{ id: “CRO-11”, name: “Martin Baturina”, team: “Croacia” },
{ id: “CRO-12”, name: “Lovro Majer”, team: “Croacia” },
{ id: “CRO-13”, name: “Foto del Equipo (Croacia)”, team: “Croacia” },
{ id: “CRO-14”, name: “Mario Pasalic”, team: “Croacia” },
{ id: “CRO-15”, name: “Petar Sucic”, team: “Croacia” },
{ id: “CRO-16”, name: “Ivan Perišić”, team: “Croacia” },
{ id: “CRO-17”, name: “Marco Pasalic”, team: “Croacia” },
{ id: “CRO-18”, name: “Ante Budimir”, team: “Croacia” },
{ id: “CRO-19”, name: “Andrej Kramarić”, team: “Croacia” },
{ id: “CRO-20”, name: “Franjo Ivanovic”, team: “Croacia” },
{ id: “CUW-1”, name: “Escudo (Curaçao)”, team: “Curaçao” },
{ id: “CUW-2”, name: “Eloy Room”, team: “Curaçao” },
{ id: “CUW-3”, name: “Armando Obispo”, team: “Curaçao” },
{ id: “CUW-4”, name: “Sherel Floranus”, team: “Curaçao” },
{ id: “CUW-5”, name: “Jurien Gaari”, team: “Curaçao” },
{ id: “CUW-6”, name: “Joshua Brenet”, team: “Curaçao” },
{ id: “CUW-7”, name: “Roshon Van Eijma”, team: “Curaçao” },
{ id: “CUW-8”, name: “Shurandy Sambo”, team: “Curaçao” },
{ id: “CUW-9”, name: “Livano Comenencia”, team: “Curaçao” },
{ id: “CUW-10”, name: “Godfried Roemeratoe”, team: “Curaçao” },
{ id: “CUW-11”, name: “Juninho Bacuna”, team: “Curaçao” },
{ id: “CUW-12”, name: “Leandro Bacuna”, team: “Curaçao” },
{ id: “CUW-13”, name: “Foto del Equipo (Curaçao)”, team: “Curaçao” },
{ id: “CUW-14”, name: “Tahith Chong”, team: “Curaçao” },
{ id: “CUW-15”, name: “Kenji Gorre”, team: “Curaçao” },
{ id: “CUW-16”, name: “Jearl Margaritha”, team: “Curaçao” },
{ id: “CUW-17”, name: “Jurgen Locadia”, team: “Curaçao” },
{ id: “CUW-18”, name: “Jeremy Antonisse”, team: “Curaçao” },
{ id: “CUW-19”, name: “Gervane Kastaneer”, team: “Curaçao” },
{ id: “CUW-20”, name: “Sontje Hansen”, team: “Curaçao” },
{ id: “CZE-1”, name: “Escudo (R. Checa)”, team: “R. Checa” },
{ id: “CZE-2”, name: “Matej Kovar”, team: “R. Checa” },
{ id: “CZE-3”, name: “Jindrich Stanek”, team: “R. Checa” },
{ id: “CZE-4”, name: “Ladislav Krejci”, team: “R. Checa” },
{ id: “CZE-5”, name: “Vladimir Coufal”, team: “R. Checa” },
{ id: “CZE-6”, name: “Jaroslav Zeleny”, team: “R. Checa” },
{ id: “CZE-7”, name: “Tomas Holes”, team: “R. Checa” },
{ id: “CZE-8”, name: “David Zima”, team: “R. Checa” },
{ id: “CZE-9”, name: “Michal Sadilek”, team: “R. Checa” },
{ id: “CZE-10”, name: “Lukas Provod”, team: “R. Checa” },
{ id: “CZE-11”, name: “Lukas Cerv”, team: “R. Checa” },
{ id: “CZE-12”, name: “Tomas Soucek”, team: “R. Checa” },
{ id: “CZE-13”, name: “Foto del Equipo (R. Checa)”, team: “R. Checa” },
{ id: “CZE-14”, name: “Pavel Sulc”, team: “R. Checa” },
{ id: “CZE-15”, name: “Matej Vydra”, team: “R. Checa” },
{ id: “CZE-16”, name: “Vasil Kusej”, team: “R. Checa” },
{ id: “CZE-17”, name: “Tomas Chory”, team: “R. Checa” },
{ id: “CZE-18”, name: “Vacilav Cerny”, team: “R. Checa” },
{ id: “CZE-19”, name: “Adam Hlozek”, team: “R. Checa” },
{ id: “CZE-20”, name: “Patrik Schick”, team: “R. Checa” },
{ id: “ECU-1”, name: “Escudo (Ecuador)”, team: “Ecuador” },
{ id: “ECU-2”, name: “Hernán Galíndez”, team: “Ecuador” },
{ id: “ECU-3”, name: “Gonzalo Valle”, team: “Ecuador” },
{ id: “ECU-4”, name: “Piero Hincapié”, team: “Ecuador” },
{ id: “ECU-5”, name: “Pervis Estupiñán”, team: “Ecuador” },
{ id: “ECU-6”, name: “Willian Pacho”, team: “Ecuador” },
{ id: “ECU-7”, name: “Ángelo Preciado”, team: “Ecuador” },
{ id: “ECU-8”, name: “Joel Ordóñez”, team: “Ecuador” },
{ id: “ECU-9”, name: “Moises Caicedo”, team: “Ecuador” },
{ id: “ECU-10”, name: “Alan Franco”, team: “Ecuador” },
{ id: “ECU-11”, name: “Kendry Paez”, team: “Ecuador” },
{ id: “ECU-12”, name: “Pedro Vite”, team: “Ecuador” },
{ id: “ECU-13”, name: “Foto del Equipo (Ecuador)”, team: “Ecuador” },
{ id: “ECU-14”, name: “John Veboah”, team: “Ecuador” },
{ id: “ECU-15”, name: “Leonardo Campana”, team: “Ecuador” },
{ id: “ECU-16”, name: “Gonzalo Plata”, team: “Ecuador” },
{ id: “ECU-17”, name: “Nilson Angulo”, team: “Ecuador” },
{ id: “ECU-18”, name: “Alan Minda”, team: “Ecuador” },
{ id: “ECU-19”, name: “Kevin Rodriguez”, team: “Ecuador” },
{ id: “ECU-20”, name: “Enner Valencia”, team: “Ecuador” },
{ id: “EGY-1”, name: “Escudo (Egipto)”, team: “Egipto” },
{ id: “EGY-2”, name: “Mohamed El Shenawy”, team: “Egipto” },
{ id: “EGY-3”, name: “Mohamed Hany”, team: “Egipto” },
{ id: “EGY-4”, name: “Mohamed Hamdy”, team: “Egipto” },
{ id: “EGY-5”, name: “Yasser Ibrahim”, team: “Egipto” },
{ id: “EGY-6”, name: “Khaled Sobhi”, team: “Egipto” },
{ id: “EGY-7”, name: “Ramy Rabia”, team: “Egipto” },
{ id: “EGY-8”, name: “Hossam Abdelmaguid”, team: “Egipto” },
{ id: “EGY-9”, name: “Ahmed Fatouh”, team: “Egipto” },
{ id: “EGY-10”, name: “Marwan Attia”, team: “Egipto” },
{ id: “EGY-11”, name: “Zizo”, team: “Egipto” },
{ id: “EGY-12”, name: “Hamdy Fathy”, team: “Egipto” },
{ id: “EGY-13”, name: “Foto del Equipo (Egipto)”, team: “Egipto” },
{ id: “EGY-14”, name: “Mohamed Lasheen”, team: “Egipto” },
{ id: “EGY-15”, name: “Emam Ashour”, team: “Egipto” },
{ id: “EGY-16”, name: “Osama Faisal”, team: “Egipto” },
{ id: “EGY-17”, name: “Mohamed Salah”, team: “Egipto” },
{ id: “EGY-18”, name: “Mostafa Mohamed”, team: “Egipto” },
{ id: “EGY-19”, name: “Trezeguet”, team: “Egipto” },
{ id: “EGY-20”, name: “Omar Marsmoush”, team: “Egipto” },
{ id: “ENG-1”, name: “Escudo (Inglaterra)”, team: “Inglaterra” },
{ id: “ENG-2”, name: “Jordan Pickford”, team: “Inglaterra” },
{ id: “ENG-3”, name: “John Stones”, team: “Inglaterra” },
{ id: “ENG-4”, name: “Marc Guehi”, team: “Inglaterra” },
{ id: “ENG-5”, name: “Ezri Konsa”, team: “Inglaterra” },
{ id: “ENG-6”, name: “Trent Alexander-Arnold”, team: “Inglaterra” },
{ id: “ENG-7”, name: “Reece James”, team: “Inglaterra” },
{ id: “ENG-8”, name: “Dan Burn”, team: “Inglaterra” },
{ id: “ENG-9”, name: “Jordan Henderson”, team: “Inglaterra” },
{ id: “ENG-10”, name: “Declan Rice”, team: “Inglaterra” },
{ id: “ENG-11”, name: “Jude Bellingham”, team: “Inglaterra” },
{ id: “ENG-12”, name: “Cole Palmer”, team: “Inglaterra” },
{ id: “ENG-13”, name: “Foto del Equipo (Inglaterra)”, team: “Inglaterra” },
{ id: “ENG-14”, name: “Morgan Rogers”, team: “Inglaterra” },
{ id: “ENG-15”, name: “Anthony Gordon”, team: “Inglaterra” },
{ id: “ENG-16”, name: “Phil Foden”, team: “Inglaterra” },
{ id: “ENG-17”, name: “Bukayo Saka”, team: “Inglaterra” },
{ id: “ENG-18”, name: “Harry Kane”, team: “Inglaterra” },
{ id: “ENG-19”, name: “Marcus Rashford”, team: “Inglaterra” },
{ id: “ENG-20”, name: “Ollie Watkins”, team: “Inglaterra” },
{ id: “ESP-1”, name: “Escudo (España)”, team: “España” },
{ id: “ESP-2”, name: “Unai Simon”, team: “España” },
{ id: “ESP-3”, name: “Robin Le Normand”, team: “España” },
{ id: “ESP-4”, name: “Aymeric Laporte”, team: “España” },
{ id: “ESP-5”, name: “Dean Huijsen”, team: “España” },
{ id: “ESP-6”, name: “Pedro Porro”, team: “España” },
{ id: “ESP-7”, name: “Dani Carvajal”, team: “España” },
{ id: “ESP-8”, name: “Marc Cucurella”, team: “España” },
{ id: “ESP-9”, name: “Martín Zubimendi”, team: “España” },
{ id: “ESP-10”, name: “Rodri”, team: “España” },
{ id: “ESP-11”, name: “Pedri”, team: “España” },
{ id: “ESP-12”, name: “Fabian Ruiz”, team: “España” },
{ id: “ESP-13”, name: “Foto del Equipo (España)”, team: “España” },
{ id: “ESP-14”, name: “Mikel Merino”, team: “España” },
{ id: “ESP-15”, name: “Lamine Yamal”, team: “España” },
{ id: “ESP-16”, name: “Dani Olmo”, team: “España” },
{ id: “ESP-17”, name: “Nico Williams”, team: “España” },
{ id: “ESP-18”, name: “Ferran Torres”, team: “España” },
{ id: “ESP-19”, name: “Álvaro Morata”, team: “España” },
{ id: “ESP-20”, name: “Mikel Oyarzabal”, team: “España” },
{ id: “FRA-1”, name: “Escudo (Francia)”, team: “Francia” },
{ id: “FRA-2”, name: “Mike Maignan”, team: “Francia” },
{ id: “FRA-3”, name: “Theo Hernandez”, team: “Francia” },
{ id: “FRA-4”, name: “William Saliba”, team: “Francia” },
{ id: “FRA-5”, name: “Jules Kounde”, team: “Francia” },
{ id: “FRA-6”, name: “Ibrahima Konate”, team: “Francia” },
{ id: “FRA-7”, name: “Dayot Upamecano”, team: “Francia” },
{ id: “FRA-8”, name: “Lucas Digne”, team: “Francia” },
{ id: “FRA-9”, name: “Aurélien Tchouaméni”, team: “Francia” },
{ id: “FRA-10”, name: “Eduardo Camavinga”, team: “Francia” },
{ id: “FRA-11”, name: “Manu Kone”, team: “Francia” },
{ id: “FRA-12”, name: “Adrien Rabiot”, team: “Francia” },
{ id: “FRA-13”, name: “Foto del Equipo (Francia)”, team: “Francia” },
{ id: “FRA-14”, name: “Michael Olise”, team: “Francia” },
{ id: “FRA-15”, name: “Ousmane Dembele”, team: “Francia” },
{ id: “FRA-16”, name: “Bradley Barcola”, team: “Francia” },
{ id: “FRA-17”, name: “Kingsley Coman”, team: “Francia” },
{ id: “FRA-18”, name: “Kylian Mbappe”, team: “Francia” },
{ id: “FRA-19”, name: “Antoine Griezmann”, team: “Francia” },
{ id: “FRA-20”, name: “Olivier Giroud”, team: “Francia” },
{ id: “GHA-1”, name: “Escudo (Ghana)”, team: “Ghana” },
{ id: “GHA-2”, name: “Joe Wollacott”, team: “Ghana” },
{ id: “GHA-3”, name: “Daniel Amartey”, team: “Ghana” },
{ id: “GHA-4”, name: “Alexander Djiku”, team: “Ghana” },
{ id: “GHA-5”, name: “Andy Yiadom”, team: “Ghana” },
{ id: “GHA-6”, name: “Abdul Rahman Baba”, team: “Ghana” },
{ id: “GHA-7”, name: “Alidu Seidu”, team: “Ghana” },
{ id: “GHA-8”, name: “Antoine Semenyo”, team: “Ghana” },
{ id: “GHA-9”, name: “Thomas Partey”, team: “Ghana” },
{ id: “GHA-10”, name: “Salis Abdul Samed”, team: “Ghana” },
{ id: “GHA-11”, name: “Daniel Kofi Kyereh”, team: “Ghana” },
{ id: “GHA-12”, name: “Elisha Owusu”, team: “Ghana” },
{ id: “GHA-13”, name: “Foto del Equipo (Ghana)”, team: “Ghana” },
{ id: “GHA-14”, name: “Osman Bukari”, team: “Ghana” },
{ id: “GHA-15”, name: “Ernest Nuamah”, team: “Ghana” },
{ id: “GHA-16”, name: “Jordan Ayew”, team: “Ghana” },
{ id: “GHA-17”, name: “André Ayew”, team: “Ghana” },
{ id: “GHA-18”, name: “Mohammed Kudus”, team: “Ghana” },
{ id: “GHA-19”, name: “Inaki Williams”, team: “Ghana” },
{ id: “GHA-20”, name: “Felix Afena-Gyan”, team: “Ghana” },
{ id: “GER-1”, name: “Escudo (Alemania)”, team: “Alemania” },
{ id: “GER-2”, name: “Oliver Baumann”, team: “Alemania” },
{ id: “GER-3”, name: “Antonio Rüdiger”, team: “Alemania” },
{ id: “GER-4”, name: “Jonathan Tah”, team: “Alemania” },
{ id: “GER-5”, name: “Nico Schlotterbeck”, team: “Alemania” },
{ id: “GER-6”, name: “Robin Gosens”, team: “Alemania” },
{ id: “GER-7”, name: “Benjamin Henrichs”, team: “Alemania” },
{ id: “GER-8”, name: “Waldemar Anton”, team: “Alemania” },
{ id: “GER-9”, name: “Leon Goretzka”, team: “Alemania” },
{ id: “GER-10”, name: “Joshua Kimmich”, team: “Alemania” },
{ id: “GER-11”, name: “Florian Wirtz”, team: “Alemania” },
{ id: “GER-12”, name: “Jamal Musiala”, team: “Alemania” },
{ id: “GER-13”, name: “Foto del Equipo (Alemania)”, team: “Alemania” },
{ id: “GER-14”, name: “Kai Havertz”, team: “Alemania” },
{ id: “GER-15”, name: “Thomas Müller”, team: “Alemania” },
{ id: “GER-16”, name: “Serge Gnabry”, team: “Alemania” },
{ id: “GER-17”, name: “Leroy Sane”, team: “Alemania” },
{ id: “GER-18”, name: “Chris Führich”, team: “Alemania” },
{ id: “GER-19”, name: “Niclas Füllkrug”, team: “Alemania” },
{ id: “GER-20”, name: “Tim Kleindienst”, team: “Alemania” },
{ id: “HAI-1”, name: “Escudo (Haití)”, team: “Haití” },
{ id: “HAI-2”, name: “Josue Duverger”, team: “Haití” },
{ id: “HAI-3”, name: “Jems Geffrard”, team: “Haití” },
{ id: “HAI-4”, name: “Steeven Saba”, team: “Haití” },
{ id: “HAI-5”, name: “Mechack Jerome”, team: “Haití” },
{ id: “HAI-6”, name: “Shaq Moore”, team: “Haití” },
{ id: “HAI-7”, name: “Kevens Belfort”, team: “Haití” },
{ id: “HAI-8”, name: “Andrew Emmanuel”, team: “Haití” },
{ id: “HAI-9”, name: “Thomas Lemar”, team: “Haití” },
{ id: “HAI-10”, name: “Frantzdy Pierrot”, team: “Haití” },
{ id: “HAI-11”, name: “Derrick Etienne”, team: “Haití” },
{ id: “HAI-12”, name: “Mikael Cantave”, team: “Haití” },
{ id: “HAI-13”, name: “Foto del Equipo (Haití)”, team: “Haití” },
{ id: “HAI-14”, name: “Duckens Nazon”, team: “Haití” },
{ id: “HAI-15”, name: “Nicolas Janvier”, team: “Haití” },
{ id: “HAI-16”, name: “Wilde Donald Guerrier”, team: “Haití” },
{ id: “HAI-17”, name: “Carnejy Antoine”, team: “Haití” },
{ id: “HAI-18”, name: “Ronaldo Damus”, team: “Haití” },
{ id: “HAI-19”, name: “Hervé Bazile”, team: “Haití” },
{ id: “HAI-20”, name: “Naomie Sonson”, team: “Haití” },
{ id: “IRN-1”, name: “Escudo (Irán)”, team: “Irán” },
{ id: “IRN-2”, name: “Alireza Beiranvand”, team: “Irán” },
{ id: “IRN-3”, name: “Ehsan Hajsafi”, team: “Irán” },
{ id: “IRN-4”, name: “Shoja Khalilzadeh”, team: “Irán” },
{ id: “IRN-5”, name: “Rouzbeh Cheshmi”, team: “Irán” },
{ id: “IRN-6”, name: “Abolfazl Jalali”, team: “Irán” },
{ id: “IRN-7”, name: “Ali Gholizadeh”, team: “Irán” },
{ id: “IRN-8”, name: “Morteza Pouraliganji”, team: “Irán” },
{ id: “IRN-9”, name: “Saeid Ezatolahi”, team: “Irán” },
{ id: “IRN-10”, name: “Ahmad Noorollahi”, team: “Irán” },
{ id: “IRN-11”, name: “Ali Karimi”, team: “Irán” },
{ id: “IRN-12”, name: “Saman Ghoddos”, team: “Irán” },
{ id: “IRN-13”, name: “Foto del Equipo (Irán)”, team: “Irán” },
{ id: “IRN-14”, name: “Mehdi Taremi”, team: “Irán” },
{ id: “IRN-15”, name: “Sardar Azmoun”, team: “Irán” },
{ id: “IRN-16”, name: “Allahyar Sayyad”, team: “Irán” },
{ id: “IRN-17”, name: “Karim Ansarifard”, team: “Irán” },
{ id: “IRN-18”, name: “Omid Ebrahimi”, team: “Irán” },
{ id: “IRN-19”, name: “Ashkan Dejagah”, team: “Irán” },
{ id: “IRN-20”, name: “Amir Reza Asadi”, team: “Irán” },
{ id: “IRQ-1”, name: “Escudo (Irak)”, team: “Irak” },
{ id: “IRQ-2”, name: “Jalal Hasan”, team: “Irak” },
{ id: “IRQ-3”, name: “Ali Adnan”, team: “Irak” },
{ id: “IRQ-4”, name: “Mustafa Nadhim”, team: “Irak” },
{ id: “IRQ-5”, name: “Muhammad Qasim”, team: “Irak” },
{ id: “IRQ-6”, name: “Rebin Sulaka”, team: “Irak” },
{ id: “IRQ-7”, name: “Saad Natiq”, team: “Irak” },
{ id: “IRQ-8”, name: “Alaa Abbas”, team: “Irak” },
{ id: “IRQ-9”, name: “Ibrahim Bayesh”, team: “Irak” },
{ id: “IRQ-10”, name: “Amjed Atwan”, team: “Irak” },
{ id: “IRQ-11”, name: “Ali Jasim”, team: “Irak” },
{ id: “IRQ-12”, name: “Mahdi Kamil”, team: “Irak” },
{ id: “IRQ-13”, name: “Foto del Equipo (Irak)”, team: “Irak” },
{ id: “IRQ-14”, name: “Emad Mohammed”, team: “Irak” },
{ id: “IRQ-15”, name: “Aymen Hussein”, team: “Irak” },
{ id: “IRQ-16”, name: “Bashar Resan”, team: “Irak” },
{ id: “IRQ-17”, name: “Mohannad Abdul-Raheem”, team: “Irak” },
{ id: “IRQ-18”, name: “Mohanad Ali”, team: “Irak” },
{ id: “IRQ-19”, name: “Ahmed Yasin”, team: “Irak” },
{ id: “IRQ-20”, name: “Humam Tariq”, team: “Irak” },
{ id: “JPN-1”, name: “Escudo (Japón)”, team: “Japón” },
{ id: “JPN-2”, name: “Zion Suzuki”, team: “Japón” },
{ id: “JPN-3”, name: “Maya Yoshida”, team: “Japón” },
{ id: “JPN-4”, name: “Ko Itakura”, team: “Japón” },
{ id: “JPN-5”, name: “Yuto Nagatomo”, team: “Japón” },
{ id: “JPN-6”, name: “Hiroki Ito”, team: “Japón” },
{ id: “JPN-7”, name: “Miki Yamane”, team: “Japón” },
{ id: “JPN-8”, name: “Takehiro Tomiyasu”, team: “Japón” },
{ id: “JPN-9”, name: “Junya Ito”, team: “Japón” },
{ id: “JPN-10”, name: “Gaku Shibasaki”, team: “Japón” },
{ id: “JPN-11”, name: “Wataru Endo”, team: “Japón” },
{ id: “JPN-12”, name: “Ao Tanaka”, team: “Japón” },
{ id: “JPN-13”, name: “Foto del Equipo (Japón)”, team: “Japón” },
{ id: “JPN-14”, name: “Ritsu Doan”, team: “Japón” },
{ id: “JPN-15”, name: “Takuma Asano”, team: “Japón” },
{ id: “JPN-16”, name: “Kaoru Mitoma”, team: “Japón” },
{ id: “JPN-17”, name: “Daichi Kamada”, team: “Japón” },
{ id: “JPN-18”, name: “Takefusa Kubo”, team: “Japón” },
{ id: “JPN-19”, name: “Ayase Ueda”, team: “Japón” },
{ id: “JPN-20”, name: “Keito Nakamura”, team: “Japón” },
{ id: “JOR-1”, name: “Escudo (Jordania)”, team: “Jordania” },
{ id: “JOR-2”, name: “Yazeed Abdelhamid”, team: “Jordania” },
{ id: “JOR-3”, name: “Baha Faisal”, team: “Jordania” },
{ id: “JOR-4”, name: “Khaled Shehadeh”, team: “Jordania” },
{ id: “JOR-5”, name: “Yazan Al-Naimat”, team: “Jordania” },
{ id: “JOR-6”, name: “Ahmad Hejazi”, team: “Jordania” },
{ id: “JOR-7”, name: “Musa Al-Taamari”, team: “Jordania” },
{ id: “JOR-8”, name: “Ibrahim Salahe”, team: “Jordania” },
{ id: “JOR-9”, name: “Nizar Al-Rashdan”, team: “Jordania” },
{ id: “JOR-10”, name: “Ahmad Daraghmeh”, team: “Jordania” },
{ id: “JOR-11”, name: “Mahmoud Al-Mardi”, team: “Jordania” },
{ id: “JOR-12”, name: “Hatem Aqel”, team: “Jordania” },
{ id: “JOR-13”, name: “Foto del Equipo (Jordania)”, team: “Jordania” },
{ id: “JOR-14”, name: “Abdullah Nasib”, team: “Jordania” },
{ id: “JOR-15”, name: “Oday Dabbagh”, team: “Jordania” },
{ id: “JOR-16”, name: “Imad Al-Hosni”, team: “Jordania” },
{ id: “JOR-17”, name: “Ahmad Al-Sarori”, team: “Jordania” },
{ id: “JOR-18”, name: “Yazan Mheesen”, team: “Jordania” },
{ id: “JOR-19”, name: “Musa Suleiman”, team: “Jordania” },
{ id: “JOR-20”, name: “Amer Shafi”, team: “Jordania” },
{ id: “KOR-1”, name: “Escudo (Corea del Sur)”, team: “Corea del Sur” },
{ id: “KOR-2”, name: “Kim Seung-gyu”, team: “Corea del Sur” },
{ id: “KOR-3”, name: “Kim Young-gwon”, team: “Corea del Sur” },
{ id: “KOR-4”, name: “Kim Min-jae”, team: “Corea del Sur” },
{ id: “KOR-5”, name: “Kim Jin-su”, team: “Corea del Sur” },
{ id: “KOR-6”, name: “Kim Moon-hwan”, team: “Corea del Sur” },
{ id: “KOR-7”, name: “Lee Ki-je”, team: “Corea del Sur” },
{ id: “KOR-8”, name: “Jung Woo-young”, team: “Corea del Sur” },
{ id: “KOR-9”, name: “Lee Jae-sung”, team: “Corea del Sur” },
{ id: “KOR-10”, name: “Hwang In-beom”, team: “Corea del Sur” },
{ id: “KOR-11”, name: “Lee Kang-in”, team: “Corea del Sur” },
{ id: “KOR-12”, name: “Paik Seung-ho”, team: “Corea del Sur” },
{ id: “KOR-13”, name: “Foto del Equipo (Corea del Sur)”, team: “Corea del Sur” },
{ id: “KOR-14”, name: “Jeong Woo-yeong”, team: “Corea del Sur” },
{ id: “KOR-15”, name: “Na Sang-ho”, team: “Corea del Sur” },
{ id: “KOR-16”, name: “Hwang Hee-chan”, team: “Corea del Sur” },
{ id: “KOR-17”, name: “Son Heung-min”, team: “Corea del Sur” },
{ id: “KOR-18”, name: “Cho Gue-sung”, team: “Corea del Sur” },
{ id: “KOR-19”, name: “Oh Hyeon-gyu”, team: “Corea del Sur” },
{ id: “KOR-20”, name: “Kwon Chang-hoon”, team: “Corea del Sur” },
{ id: “MEX-1”, name: “Escudo (México)”, team: “México” },
{ id: “MEX-2”, name: “Guillermo Ochoa”, team: “México” },
{ id: “MEX-3”, name: “Luis Malagon”, team: “México” },
{ id: “MEX-4”, name: “Johan Vasquez”, team: “México” },
{ id: “MEX-5”, name: “Cesar Montes”, team: “México” },
{ id: “MEX-6”, name: “Jorge Sanchez”, team: “México” },
{ id: “MEX-7”, name: “Gerardo Arteaga”, team: “México” },
{ id: “MEX-8”, name: “Nestor Araujo”, team: “México” },
{ id: “MEX-9”, name: “Edson Alvarez”, team: “México” },
{ id: “MEX-10”, name: “Luis Romo”, team: “México” },
{ id: “MEX-11”, name: “Jesus Corona”, team: “México” },
{ id: “MEX-12”, name: “Erick Gutierrez”, team: “México” },
{ id: “MEX-13”, name: “Foto del Equipo (México)”, team: “México” },
{ id: “MEX-14”, name: “Orbelin Pineda”, team: “México” },
{ id: “MEX-15”, name: “Hirving Lozano”, team: “México” },
{ id: “MEX-16”, name: “Roberto Alvarado”, team: “México” },
{ id: “MEX-17”, name: “Alexis Vega”, team: “México” },
{ id: “MEX-18”, name: “Henry Martin”, team: “México” },
{ id: “MEX-19”, name: “Santiago Gimenez”, team: “México” },
{ id: “MEX-20”, name: “Raul Jimenez”, team: “México” },
{ id: “MAR-1”, name: “Escudo (Marruecos)”, team: “Marruecos” },
{ id: “MAR-2”, name: “Yassine Bounou”, team: “Marruecos” },
{ id: “MAR-3”, name: “Achraf Hakimi”, team: “Marruecos” },
{ id: “MAR-4”, name: “Romain Saiss”, team: “Marruecos” },
{ id: “MAR-5”, name: “Nayef Aguerd”, team: “Marruecos” },
{ id: “MAR-6”, name: “Jawad El Yamiq”, team: “Marruecos” },
{ id: “MAR-7”, name: “Yahia Attiat-Allah”, team: “Marruecos” },
{ id: “MAR-8”, name: “Adam Masina”, team: “Marruecos” },
{ id: “MAR-9”, name: “Selim Amallah”, team: “Marruecos” },
{ id: “MAR-10”, name: “Azzedine Ounahi”, team: “Marruecos” },
{ id: “MAR-11”, name: “Sofyan Amrabat”, team: “Marruecos” },
{ id: “MAR-12”, name: “Ilias Chair”, team: “Marruecos” },
{ id: “MAR-13”, name: “Foto del Equipo (Marruecos)”, team: “Marruecos” },
{ id: “MAR-14”, name: “Hakim Ziyech”, team: “Marruecos” },
{ id: “MAR-15”, name: “Abde Ezzalzouli”, team: “Marruecos” },
{ id: “MAR-16”, name: “Ayoub El Kaabi”, team: “Marruecos” },
{ id: “MAR-17”, name: “Sofiane Boufal”, team: “Marruecos” },
{ id: “MAR-18”, name: “Youssef En-Nesyri”, team: “Marruecos” },
{ id: “MAR-19”, name: “Munir El Haddadi”, team: “Marruecos” },
{ id: “MAR-20”, name: “Zakaria Aboukhlal”, team: “Marruecos” },
{ id: “NED-1”, name: “Escudo (Países Bajos)”, team: “Países Bajos” },
{ id: “NED-2”, name: “Bart Verbruggen”, team: “Países Bajos” },
{ id: “NED-3”, name: “Virgil van Dijk”, team: “Países Bajos” },
{ id: “NED-4”, name: “Stefan de Vrij”, team: “Países Bajos” },
{ id: “NED-5”, name: “Denzel Dumfries”, team: “Países Bajos” },
{ id: “NED-6”, name: “Jurrien Timber”, team: “Países Bajos” },
{ id: “NED-7”, name: “Nathan Ake”, team: “Países Bajos” },
{ id: “NED-8”, name: “Jan Paul van Hecke”, team: “Países Bajos” },
{ id: “NED-9”, name: “Frenkie de Jong”, team: “Países Bajos” },
{ id: “NED-10”, name: “Tijjani Reijnders”, team: “Países Bajos” },
{ id: “NED-11”, name: “Teun Koopmeiners”, team: “Países Bajos” },
{ id: “NED-12”, name: “Jerdy Schouten”, team: “Países Bajos” },
{ id: “NED-13”, name: “Foto del Equipo (Países Bajos)”, team: “Países Bajos” },
{ id: “NED-14”, name: “Ryan Gravenberch”, team: “Países Bajos” },
{ id: “NED-15”, name: “Memphis Depay”, team: “Países Bajos” },
{ id: “NED-16”, name: “Cody Gakpo”, team: “Países Bajos” },
{ id: “NED-17”, name: “Donyell Malen”, team: “Países Bajos” },
{ id: “NED-18”, name: “Xavi Simons”, team: “Países Bajos” },
{ id: “NED-19”, name: “Wout Weghorst”, team: “Países Bajos” },
{ id: “NED-20”, name: “Brian Brobbey”, team: “Países Bajos” },
{ id: “NZL-1”, name: “Escudo (Nueva Zelanda)”, team: “Nueva Zelanda” },
{ id: “NZL-2”, name: “Max Crocombe”, team: “Nueva Zelanda” },
{ id: “NZL-3”, name: “Tommy Smith”, team: “Nueva Zelanda” },
{ id: “NZL-4”, name: “Winston Reid”, team: “Nueva Zelanda” },
{ id: “NZL-5”, name: “Liberato Cacace”, team: “Nueva Zelanda” },
{ id: “NZL-6”, name: “Michael Boxall”, team: “Nueva Zelanda” },
{ id: “NZL-7”, name: “Nando Pijnaker”, team: “Nueva Zelanda” },
{ id: “NZL-8”, name: “Joe Bell”, team: “Nueva Zelanda” },
{ id: “NZL-9”, name: “Clayton Lewis”, team: “Nueva Zelanda” },
{ id: “NZL-10”, name: “Elijah Just”, team: “Nueva Zelanda” },
{ id: “NZL-11”, name: “Callum McCowatt”, team: “Nueva Zelanda” },
{ id: “NZL-12”, name: “Marco Rojas”, team: “Nueva Zelanda” },
{ id: “NZL-13”, name: “Foto del Equipo (Nueva Zelanda)”, team: “Nueva Zelanda” },
{ id: “NZL-14”, name: “Fin Lüthy”, team: “Nueva Zelanda” },
{ id: “NZL-15”, name: “Matthew Garbett”, team: “Nueva Zelanda” },
{ id: “NZL-16”, name: “Ben Old”, team: “Nueva Zelanda” },
{ id: “NZL-17”, name: “Kosta Barbarouses”, team: “Nueva Zelanda” },
{ id: “NZL-18”, name: “Sarpreet Singh”, team: “Nueva Zelanda” },
{ id: “NZL-19”, name: “Chris Wood”, team: “Nueva Zelanda” },
{ id: “NZL-20”, name: “Myer Bevan”, team: “Nueva Zelanda” },
{ id: “NOR-1”, name: “Escudo (Noruega)”, team: “Noruega” },
{ id: “NOR-2”, name: “Ørjan Nyland”, team: “Noruega” },
{ id: “NOR-3”, name: “Leo Ostigard”, team: “Noruega” },
{ id: “NOR-4”, name: “Andreas Hanche-Olsen”, team: “Noruega” },
{ id: “NOR-5”, name: “Birger Meling”, team: “Noruega” },
{ id: “NOR-6”, name: “Stian Gregersen”, team: “Noruega” },
{ id: “NOR-7”, name: “Kristoffer Ajer”, team: “Noruega” },
{ id: “NOR-8”, name: “Patrick Berg”, team: “Noruega” },
{ id: “NOR-9”, name: “Fredrik Aursnes”, team: “Noruega” },
{ id: “NOR-10”, name: “Martin Odegaard”, team: “Noruega” },
{ id: “NOR-11”, name: “Sander Berge”, team: “Noruega” },
{ id: “NOR-12”, name: “Mats Moller Daehli”, team: “Noruega” },
{ id: “NOR-13”, name: “Foto del Equipo (Noruega)”, team: “Noruega” },
{ id: “NOR-14”, name: “Alexander Sorloth”, team: “Noruega” },
{ id: “NOR-15”, name: “Mohamed Elyounoussi”, team: “Noruega” },
{ id: “NOR-16”, name: “Antonio Nusa”, team: “Noruega” },
{ id: “NOR-17”, name: “Erling Haaland”, team: “Noruega” },
{ id: “NOR-18”, name: “Jens Petter Hauge”, team: “Noruega” },
{ id: “NOR-19”, name: “Ola Solbakken”, team: “Noruega” },
{ id: “NOR-20”, name: “Ohi Omoijuanfo”, team: “Noruega” },
{ id: “PAN-1”, name: “Escudo (Panamá)”, team: “Panamá” },
{ id: “PAN-2”, name: “Luis Mejia”, team: “Panamá” },
{ id: “PAN-3”, name: “Eric Davis”, team: “Panamá” },
{ id: “PAN-4”, name: “Roderick Miller”, team: “Panamá” },
{ id: “PAN-5”, name: “Roman Torres”, team: “Panamá” },
{ id: “PAN-6”, name: “Jose Cordoba”, team: “Panamá” },
{ id: “PAN-7”, name: “Harold Cummings”, team: “Panamá” },
{ id: “PAN-8”, name: “Michael Murillo”, team: “Panamá” },
{ id: “PAN-9”, name: “Alfredo Stephens”, team: “Panamá” },
{ id: “PAN-10”, name: “Anibal Godoy”, team: “Panamá” },
{ id: “PAN-11”, name: “Adalberto Carrasquilla”, team: “Panamá” },
{ id: “PAN-12”, name: “Aníbal Godoy”, team: “Panamá” },
{ id: “PAN-13”, name: “Foto del Equipo (Panamá)”, team: “Panamá” },
{ id: “PAN-14”, name: “Edgar Barcenas”, team: “Panamá” },
{ id: “PAN-15”, name: “Cecilio Waterman”, team: “Panamá” },
{ id: “PAN-16”, name: “Gabriel Torres”, team: “Panamá” },
{ id: “PAN-17”, name: “Jose Fajardo”, team: “Panamá” },
{ id: “PAN-18”, name: “Ismael Diaz”, team: “Panamá” },
{ id: “PAN-19”, name: “Alberto Quintero”, team: “Panamá” },
{ id: “PAN-20”, name: “Rolando Blackburn”, team: “Panamá” },
{ id: “PAR-1”, name: “Escudo (Paraguay)”, team: “Paraguay” },
{ id: “PAR-2”, name: “Anthony Silva”, team: “Paraguay” },
{ id: “PAR-3”, name: “Junior Alonso”, team: “Paraguay” },
{ id: “PAR-4”, name: “Omar Alderete”, team: “Paraguay” },
{ id: “PAR-5”, name: “Fabian Balbuena”, team: “Paraguay” },
{ id: “PAR-6”, name: “Robert Rojas”, team: “Paraguay” },
{ id: “PAR-7”, name: “Santiago Arzamendia”, team: “Paraguay” },
{ id: “PAR-8”, name: “Mathias Villasanti”, team: “Paraguay” },
{ id: “PAR-9”, name: “Andres Cubas”, team: “Paraguay” },
{ id: “PAR-10”, name: “Braian Samudio”, team: “Paraguay” },
{ id: “PAR-11”, name: “Miguel Almiron”, team: “Paraguay” },
{ id: “PAR-12”, name: “Andres Riveros”, team: “Paraguay” },
{ id: “PAR-13”, name: “Foto del Equipo (Paraguay)”, team: “Paraguay” },
{ id: “PAR-14”, name: “Julio Enciso”, team: “Paraguay” },
{ id: “PAR-15”, name: “Nicolas Acevedo”, team: “Paraguay” },
{ id: “PAR-16”, name: “Alejandro Romero”, team: “Paraguay” },
{ id: “PAR-17”, name: “Ivan Ramirez”, team: “Paraguay” },
{ id: “PAR-18”, name: “Antonio Sanabria”, team: “Paraguay” },
{ id: “PAR-19”, name: “Angel Romero”, team: “Paraguay” },
{ id: “PAR-20”, name: “Derlis Gonzalez”, team: “Paraguay” },
{ id: “POR-1”, name: “Escudo (Portugal)”, team: “Portugal” },
{ id: “POR-2”, name: “Rui Patricio”, team: “Portugal” },
{ id: “POR-3”, name: “Diogo Dalot”, team: “Portugal” },
{ id: “POR-4”, name: “Ruben Dias”, team: “Portugal” },
{ id: “POR-5”, name: “Pepe”, team: “Portugal” },
{ id: “POR-6”, name: “Nuno Mendes”, team: “Portugal” },
{ id: “POR-7”, name: “Joao Cancelo”, team: “Portugal” },
{ id: “POR-8”, name: “Joao Palhinha”, team: “Portugal” },
{ id: “POR-9”, name: “Vitinha”, team: “Portugal” },
{ id: “POR-10”, name: “Bruno Fernandes”, team: “Portugal” },
{ id: “POR-11”, name: “Ruben Neves”, team: “Portugal” },
{ id: “POR-12”, name: “Bernardo Silva”, team: “Portugal” },
{ id: “POR-13”, name: “Foto del Equipo (Portugal)”, team: “Portugal” },
{ id: “POR-14”, name: “Joao Felix”, team: “Portugal” },
{ id: “POR-15”, name: “Rafael Leao”, team: “Portugal” },
{ id: “POR-16”, name: “Otavio”, team: “Portugal” },
{ id: “POR-17”, name: “Cristiano Ronaldo”, team: “Portugal” },
{ id: “POR-18”, name: “Goncalo Ramos”, team: “Portugal” },
{ id: “POR-19”, name: “Diogo Jota”, team: “Portugal” },
{ id: “POR-20”, name: “Pedro Neto”, team: “Portugal” },
{ id: “QAT-1”, name: “Escudo (Catar)”, team: “Catar” },
{ id: “QAT-2”, name: “Meshaal Barsham”, team: “Catar” },
{ id: “QAT-3”, name: “Pedro Miguel”, team: “Catar” },
{ id: “QAT-4”, name: “Bassam Al-Rawi”, team: “Catar” },
{ id: “QAT-5”, name: “Abdelkarim Hassan”, team: “Catar” },
{ id: “QAT-6”, name: “Boualem Khoukhi”, team: “Catar” },
{ id: “QAT-7”, name: “Homam Ahmed”, team: “Catar” },
{ id: “QAT-8”, name: “Karim Boudiaf”, team: “Catar” },
{ id: “QAT-9”, name: “Ali Asad”, team: “Catar” },
{ id: “QAT-10”, name: “Assim Omer Madibo”, team: “Catar” },
{ id: “QAT-11”, name: “Akram Afif”, team: “Catar” },
{ id: “QAT-12”, name: “Ismail Mohamad”, team: “Catar” },
{ id: “QAT-13”, name: “Foto del Equipo (Catar)”, team: “Catar” },
{ id: “QAT-14”, name: “Hassan Al-Haydos”, team: “Catar” },
{ id: “QAT-15”, name: “Yusuf Abdurisag”, team: “Catar” },
{ id: “QAT-16”, name: “Almoez Ali”, team: “Catar” },
{ id: “QAT-17”, name: “Jassem Gaber”, team: “Catar” },
{ id: “QAT-18”, name: “Khalid Muneer”, team: “Catar” },
{ id: “QAT-19”, name: “Mohammed Muntari”, team: “Catar” },
{ id: “QAT-20”, name: “Ahmed Alaaeldin”, team: “Catar” },
{ id: “KSA-1”, name: “Escudo (Arabia Saudí)”, team: “Arabia Saudí” },
{ id: “KSA-2”, name: “Mohammed Al Owais”, team: “Arabia Saudí” },
{ id: “KSA-3”, name: “Ali Al-Bulaihi”, team: “Arabia Saudí” },
{ id: “KSA-4”, name: “Hassan Tambakti”, team: “Arabia Saudí” },
{ id: “KSA-5”, name: “Abdullah Madu”, team: “Arabia Saudí” },
{ id: “KSA-6”, name: “Sultan Al-Ghannam”, team: “Arabia Saudí” },
{ id: “KSA-7”, name: “Saud Abdulhamid”, team: “Arabia Saudí” },
{ id: “KSA-8”, name: “Mohammed Al-Burayk”, team: “Arabia Saudí” },
{ id: “KSA-9”, name: “Salman Al-Faraj”, team: “Arabia Saudí” },
{ id: “KSA-10”, name: “Abdulellah Al-Malki”, team: “Arabia Saudí” },
{ id: “KSA-11”, name: “Nasser Al-Dawsari”, team: “Arabia Saudí” },
{ id: “KSA-12”, name: “Ali Al-Hassan”, team: “Arabia Saudí” },
{ id: “KSA-13”, name: “Foto del Equipo (Arabia Saudí)”, team: “Arabia Saudí” },
{ id: “KSA-14”, name: “Hatan Bahbri”, team: “Arabia Saudí” },
{ id: “KSA-15”, name: “Mohammed Kanno”, team: “Arabia Saudí” },
{ id: “KSA-16”, name: “Sami Al-Najei”, team: “Arabia Saudí” },
{ id: “KSA-17”, name: “Firas Al-Buraikan”, team: “Arabia Saudí” },
{ id: “KSA-18”, name: “Saleh Al-Shehri”, team: “Arabia Saudí” },
{ id: “KSA-19”, name: “Ali Al-Abid”, team: “Arabia Saudí” },
{ id: “KSA-20”, name: “Abdullah Al-Hamdan”, team: “Arabia Saudí” },
{ id: “SCO-1”, name: “Escudo (Escocia)”, team: “Escocia” },
{ id: “SCO-2”, name: “Angus Gunn”, team: “Escocia” },
{ id: “SCO-3”, name: “Andrew Robertson”, team: “Escocia” },
{ id: “SCO-4”, name: “Grant Hanley”, team: “Escocia” },
{ id: “SCO-5”, name: “Jack Hendry”, team: “Escocia” },
{ id: “SCO-6”, name: “Aaron Hickey”, team: “Escocia” },
{ id: “SCO-7”, name: “Anthony Ralston”, team: “Escocia” },
{ id: “SCO-8”, name: “Callum McGregor”, team: “Escocia” },
{ id: “SCO-9”, name: “Billy Gilmour”, team: “Escocia” },
{ id: “SCO-10”, name: “Ryan Christie”, team: “Escocia” },
{ id: “SCO-11”, name: “Stuart Armstrong”, team: “Escocia” },
{ id: “SCO-12”, name: “John McGinn”, team: “Escocia” },
{ id: “SCO-13”, name: “Foto del Equipo (Escocia)”, team: “Escocia” },
{ id: “SCO-14”, name: “Ryan Jack”, team: “Escocia” },
{ id: “SCO-15”, name: “Lyndon Dykes”, team: “Escocia” },
{ id: “SCO-16”, name: “Lawrence Shankland”, team: “Escocia” },
{ id: “SCO-17”, name: “Che Adams”, team: “Escocia” },
{ id: “SCO-18”, name: “Scott McTominay”, team: “Escocia” },
{ id: “SCO-19”, name: “Ryan Gauld”, team: “Escocia” },
{ id: “SCO-20”, name: “Liam Kelly”, team: “Escocia” },
{ id: “SEN-1”, name: “Escudo (Senegal)”, team: “Senegal” },
{ id: “SEN-2”, name: “Edouard Mendy”, team: “Senegal” },
{ id: “SEN-3”, name: “Abdou Diallo”, team: “Senegal” },
{ id: “SEN-4”, name: “Kalidou Koulibaly”, team: “Senegal” },
{ id: “SEN-5”, name: “Fode Ballo-Toure”, team: “Senegal” },
{ id: “SEN-6”, name: “Formose Mendy”, team: “Senegal” },
{ id: “SEN-7”, name: “Moussa Niakhate”, team: “Senegal” },
{ id: “SEN-8”, name: “Pape Gueye”, team: “Senegal” },
{ id: “SEN-9”, name: “Nampalys Mendy”, team: “Senegal” },
{ id: “SEN-10”, name: “Cheikhou Kouyate”, team: “Senegal” },
{ id: “SEN-11”, name: “Lamine Camara”, team: “Senegal” },
{ id: “SEN-12”, name: “Krepin Diatta”, team: “Senegal” },
{ id: “SEN-13”, name: “Foto del Equipo (Senegal)”, team: “Senegal” },
{ id: “SEN-14”, name: “Ismaila Sarr”, team: “Senegal” },
{ id: “SEN-15”, name: “Bamba Dieng”, team: “Senegal” },
{ id: “SEN-16”, name: “Nicolas Jackson”, team: “Senegal” },
{ id: “SEN-17”, name: “Sadio Mane”, team: “Senegal” },
{ id: “SEN-18”, name: “Habib Diallo”, team: “Senegal” },
{ id: “SEN-19”, name: “Iliman Ndiaye”, team: “Senegal” },
{ id: “SEN-20”, name: “Pape Matar Sarr”, team: “Senegal” },
{ id: “RSA-1”, name: “Escudo (Sudáfrica)”, team: “Sudáfrica” },
{ id: “RSA-2”, name: “Ronwen Williams”, team: “Sudáfrica” },
{ id: “RSA-3”, name: “Rushine de Reuck”, team: “Sudáfrica” },
{ id: “RSA-4”, name: “Siyanda Xulu”, team: “Sudáfrica” },
{ id: “RSA-5”, name: “Innocent Maela”, team: “Sudáfrica” },
{ id: “RSA-6”, name: “Mothobi Mvala”, team: “Sudáfrica” },
{ id: “RSA-7”, name: “Bongani Zungu”, team: “Sudáfrica” },
{ id: “RSA-8”, name: “Teboho Mokoena”, team: “Sudáfrica” },
{ id: “RSA-9”, name: “Ethan Ntshumayelo”, team: “Sudáfrica” },
{ id: “RSA-10”, name: “Goodman Mosele”, team: “Sudáfrica” },
{ id: “RSA-11”, name: “Themba Zwane”, team: “Sudáfrica” },
{ id: “RSA-12”, name: “Lyle Foster”, team: “Sudáfrica” },
{ id: “RSA-13”, name: “Foto del Equipo (Sudáfrica)”, team: “Sudáfrica” },
{ id: “RSA-14”, name: “Tercious Malepe”, team: “Sudáfrica” },
{ id: “RSA-15”, name: “Luther Singh”, team: “Sudáfrica” },
{ id: “RSA-16”, name: “Percy Tau”, team: “Sudáfrica” },
{ id: “RSA-17”, name: “Sphelele Mkhulise”, team: “Sudáfrica” },
{ id: “RSA-18”, name: “Lebo Mothiba”, team: “Sudáfrica” },
{ id: “RSA-19”, name: “Evidence Makgopa”, team: “Sudáfrica” },
{ id: “RSA-20”, name: “Khuliso Mudau”, team: “Sudáfrica” },
{ id: “SWE-1”, name: “Escudo (Suecia)”, team: “Suecia” },
{ id: “SWE-2”, name: “Robin Olsen”, team: “Suecia” },
{ id: “SWE-3”, name: “Victor Lindelof”, team: “Suecia” },
{ id: “SWE-4”, name: “Isak Hien”, team: “Suecia” },
{ id: “SWE-5”, name: “Mattias Svanberg”, team: “Suecia” },
{ id: “SWE-6”, name: “Ludwig Augustinsson”, team: “Suecia” },
{ id: “SWE-7”, name: “Carl Starfelt”, team: “Suecia” },
{ id: “SWE-8”, name: “Kristoffer Olsson”, team: “Suecia” },
{ id: “SWE-9”, name: “Dejan Kulusevski”, team: “Suecia” },
{ id: “SWE-10”, name: “Emil Forsberg”, team: “Suecia” },
{ id: “SWE-11”, name: “Viktor Gyokeres”, team: “Suecia” },
{ id: “SWE-12”, name: “Albin Ekdal”, team: “Suecia” },
{ id: “SWE-13”, name: “Foto del Equipo (Suecia)”, team: “Suecia” },
{ id: “SWE-14”, name: “Samuel Chukwueze”, team: “Suecia” },
{ id: “SWE-15”, name: “Jesper Karlsson”, team: “Suecia” },
{ id: “SWE-16”, name: “Jens Cajuste”, team: “Suecia” },
{ id: “SWE-17”, name: “Alexander Isak”, team: “Suecia” },
{ id: “SWE-18”, name: “Jordan Larsson”, team: “Suecia” },
{ id: “SWE-19”, name: “Marcus Berg”, team: “Suecia” },
{ id: “SWE-20”, name: “Robin Quaison”, team: “Suecia” },
{ id: “SUI-1”, name: “Escudo (Suiza)”, team: “Suiza” },
{ id: “SUI-2”, name: “Yann Sommer”, team: “Suiza” },
{ id: “SUI-3”, name: “Fabian Schar”, team: “Suiza” },
{ id: “SUI-4”, name: “Manuel Akanji”, team: “Suiza” },
{ id: “SUI-5”, name: “Nico Elvedi”, team: “Suiza” },
{ id: “SUI-6”, name: “Silvan Widmer”, team: “Suiza” },
{ id: “SUI-7”, name: “Ricardo Rodriguez”, team: “Suiza” },
{ id: “SUI-8”, name: “Denis Zakaria”, team: “Suiza” },
{ id: “SUI-9”, name: “Granit Xhaka”, team: “Suiza” },
{ id: “SUI-10”, name: “Remo Freuler”, team: “Suiza” },
{ id: “SUI-11”, name: “Xherdan Shaqiri”, team: “Suiza” },
{ id: “SUI-12”, name: “Djibril Sow”, team: “Suiza” },
{ id: “SUI-13”, name: “Foto del Equipo (Suiza)”, team: “Suiza” },
{ id: “SUI-14”, name: “Ruben Vargas”, team: “Suiza” },
{ id: “SUI-15”, name: “Michel Aebischer”, team: “Suiza” },
{ id: “SUI-16”, name: “Fabian Rieder”, team: “Suiza” },
{ id: “SUI-17”, name: “Breel Embolo”, team: “Suiza” },
{ id: “SUI-18”, name: “Zeki Amdouni”, team: “Suiza” },
{ id: “SUI-19”, name: “Kwadwo Duah”, team: “Suiza” },
{ id: “SUI-20”, name: “Haris Seferovic”, team: “Suiza” },
{ id: “TUN-1”, name: “Escudo (Túnez)”, team: “Túnez” },
{ id: “TUN-2”, name: “Aymen Dahmen”, team: “Túnez” },
{ id: “TUN-3”, name: “Montassar Talbi”, team: “Túnez” },
{ id: “TUN-4”, name: “Dylan Bronn”, team: “Túnez” },
{ id: “TUN-5”, name: “Oussama Haddadi”, team: “Túnez” },
{ id: “TUN-6”, name: “Ali Abdi”, team: “Túnez” },
{ id: “TUN-7”, name: “Mohamed Drager”, team: “Túnez” },
{ id: “TUN-8”, name: “Elyess Skhiri”, team: “Túnez” },
{ id: “TUN-9”, name: “Hannibal Mejbri”, team: “Túnez” },
{ id: “TUN-10”, name: “Aïssa Laïdouni”, team: “Túnez” },
{ id: “TUN-11”, name: “Naim Sliti”, team: “Túnez” },
{ id: “TUN-12”, name: “Ferjani Sassi”, team: “Túnez” },
{ id: “TUN-13”, name: “Foto del Equipo (Túnez)”, team: “Túnez” },
{ id: “TUN-14”, name: “Nizar Issaoui”, team: “Túnez” },
{ id: “TUN-15”, name: “Youssef Msakni”, team: “Túnez” },
{ id: “TUN-16”, name: “Mohamed Ali Ben Romdhane”, team: “Túnez” },
{ id: “TUN-17”, name: “Wahbi Khazri”, team: “Túnez” },
{ id: “TUN-18”, name: “Seifeddine Jaziri”, team: “Túnez” },
{ id: “TUN-19”, name: “Taha Yassine Khenissi”, team: “Túnez” },
{ id: “TUN-20”, name: “Issam Jebali”, team: “Túnez” },
{ id: “TUR-1”, name: “Escudo (Turquía)”, team: “Turquía” },
{ id: “TUR-2”, name: “Altay Bayindir”, team: “Turquía” },
{ id: “TUR-3”, name: “Merih Demiral”, team: “Turquía” },
{ id: “TUR-4”, name: “Samet Akaydin”, team: “Turquía” },
{ id: “TUR-5”, name: “Abdulkerim Bardakci”, team: “Turquía” },
{ id: “TUR-6”, name: “Mert Muldur”, team: “Turquía” },
{ id: “TUR-7”, name: “Ferdi Kadioglu”, team: “Turquía” },
{ id: “TUR-8”, name: “Kaan Ayhan”, team: “Turquía” },
{ id: “TUR-9”, name: “Hakan Calhanoglu”, team: “Turquía” },
{ id: “TUR-10”, name: “Salih Ozcan”, team: “Turquía” },
{ id: “TUR-11”, name: “Orkun Kokcu”, team: “Turquía” },
{ id: “TUR-12”, name: “Ismail Yuksek”, team: “Turquía” },
{ id: “TUR-13”, name: “Foto del Equipo (Turquía)”, team: “Turquía” },
{ id: “TUR-14”, name: “Kerem Akturkoglu”, team: “Turquía” },
{ id: “TUR-15”, name: “Arda Guler”, team: “Turquía” },
{ id: “TUR-16”, name: “Yusuf Yazici”, team: “Turquía” },
{ id: “TUR-17”, name: “Bertug Yildirim”, team: “Turquía” },
{ id: “TUR-18”, name: “Baris Alper Yilmaz”, team: “Turquía” },
{ id: “TUR-19”, name: “Cenk Tosun”, team: “Turquía” },
{ id: “TUR-20”, name: “Boulaye Dia”, team: “Turquía” },
{ id: “USA-1”, name: “Escudo (EEUU)”, team: “EEUU” },
{ id: “USA-2”, name: “Matt Turner”, team: “EEUU” },
{ id: “USA-3”, name: “Tim Ream”, team: “EEUU” },
{ id: “USA-4”, name: “Miles Robinson”, team: “EEUU” },
{ id: “USA-5”, name: “Joe Scally”, team: “EEUU” },
{ id: “USA-6”, name: “Antonee Robinson”, team: “EEUU” },
{ id: “USA-7”, name: “Sergiño Dest”, team: “EEUU” },
{ id: “USA-8”, name: “DeAndre Yedlin”, team: “EEUU” },
{ id: “USA-9”, name: “Tyler Adams”, team: “EEUU” },
{ id: “USA-10”, name: “Weston McKennie”, team: “EEUU” },
{ id: “USA-11”, name: “Yunus Musah”, team: “EEUU” },
{ id: “USA-12”, name: “Brenden Aaronson”, team: “EEUU” },
{ id: “USA-13”, name: “Foto del Equipo (EEUU)”, team: “EEUU” },
{ id: “USA-14”, name: “Gio Reyna”, team: “EEUU” },
{ id: “USA-15”, name: “Tim Weah”, team: “EEUU” },
{ id: “USA-16”, name: “Malik Tillman”, team: “EEUU” },
{ id: “USA-17”, name: “Ricardo Pepi”, team: “EEUU” },
{ id: “USA-18”, name: “Folarin Balogun”, team: “EEUU” },
{ id: “USA-19”, name: “Joshua Sargent”, team: “EEUU” },
{ id: “USA-20”, name: “Christian Pulisic”, team: “EEUU” },
{ id: “URU-1”, name: “Escudo (Uruguay)”, team: “Uruguay” },
{ id: “URU-2”, name: “Sergio Rochet”, team: “Uruguay” },
{ id: “URU-3”, name: “Jose Maria Gimenez”, team: “Uruguay” },
{ id: “URU-4”, name: “Diego Godin”, team: “Uruguay” },
{ id: “URU-5”, name: “Ronald Araujo”, team: “Uruguay” },
{ id: “URU-6”, name: “Mathias Olivera”, team: “Uruguay” },
{ id: “URU-7”, name: “Giovanni Gonzalez”, team: “Uruguay” },
{ id: “URU-8”, name: “Facundo Pellistri”, team: “Uruguay” },
{ id: “URU-9”, name: “Federico Valverde”, team: “Uruguay” },
{ id: “URU-10”, name: “Rodrigo Bentancur”, team: “Uruguay” },
{ id: “URU-11”, name: “Lucas Torreira”, team: “Uruguay” },
{ id: “URU-12”, name: “Nahitan Nandez”, team: “Uruguay” },
{ id: “URU-13”, name: “Foto del Equipo (Uruguay)”, team: “Uruguay” },
{ id: “URU-14”, name: “Maximiliano Araujo”, team: “Uruguay” },
{ id: “URU-15”, name: “Facundo Torres”, team: “Uruguay” },
{ id: “URU-16”, name: “Darwin Nunez”, team: “Uruguay” },
{ id: “URU-17”, name: “Luis Suarez”, team: “Uruguay” },
{ id: “URU-18”, name: “Edinson Cavani”, team: “Uruguay” },
{ id: “URU-19”, name: “Agustin Canobbio”, team: “Uruguay” },
{ id: “URU-20”, name: “Brian Ocampo”, team: “Uruguay” },
{ id: “UZB-1”, name: “Escudo (Uzbekistán)”, team: “Uzbekistán” },
{ id: “UZB-2”, name: “Utkir Yusupov”, team: “Uzbekistán” },
{ id: “UZB-3”, name: “Hurshid Mustafoev”, team: “Uzbekistán” },
{ id: “UZB-4”, name: “Sherzod Nishonov”, team: “Uzbekistán” },
{ id: “UZB-5”, name: “Dilshod Yo'ldoshev”, team: “Uzbekistán” },
{ id: “UZB-6”, name: “Jasur Yakhshiboev”, team: “Uzbekistán” },
{ id: “UZB-7”, name: “Husan Abduraximov”, team: “Uzbekistán” },
{ id: “UZB-8”, name: “Eldor Shomurodov”, team: “Uzbekistán” },
{ id: “UZB-9”, name: “Jaloliddin Masharipov”, team: “Uzbekistán” },
{ id: “UZB-10”, name: “Bobir Abdikholiqov”, team: “Uzbekistán” },
{ id: “UZB-11”, name: “Otabek Shukurov”, team: “Uzbekistán” },
{ id: “UZB-12”, name: “Umid Yo'ldoshev”, team: “Uzbekistán” },
{ id: “UZB-13”, name: “Foto del Equipo (Uzbekistán)”, team: “Uzbekistán” },
{ id: “UZB-14”, name: “Dostonbek Khamdamov”, team: “Uzbekistán” },
{ id: “UZB-15”, name: “Islom Tukhtasinov”, team: “Uzbekistán” },
{ id: “UZB-16”, name: “Abbosbek Fayzullaev”, team: “Uzbekistán” },
{ id: “UZB-17”, name: “Jamshid Iskanderov”, team: “Uzbekistán” },
{ id: “UZB-18”, name: “Akbar Tursunov”, team: “Uzbekistán” },
{ id: “UZB-19”, name: “Oybek Dzhaksybekov”, team: “Uzbekistán” },
{ id: “UZB-20”, name: “Furkat Kholdorov”, team: “Uzbekistán” },
{ id: “EXT-1”, name: “Extra Sticker 1”, team: “Extra” },
{ id: “EXT-2”, name: “Extra Sticker 2”, team: “Extra” },
{ id: “EXT-3”, name: “Extra Sticker 3”, team: “Extra” },
{ id: “EXT-4”, name: “Extra Sticker 4”, team: “Extra” },
{ id: “EXT-5”, name: “Extra Sticker 5”, team: “Extra” },
{ id: “EXT-6”, name: “Extra Sticker 6”, team: “Extra” },
{ id: “EXT-7”, name: “Extra Sticker 7”, team: “Extra” },
{ id: “EXT-8”, name: “Extra Sticker 8”, team: “Extra” },
{ id: “EXT-9”, name: “Extra Sticker 9”, team: “Extra” },
{ id: “EXT-10”, name: “Extra Sticker 10”, team: “Extra” },
{ id: “EXT-11”, name: “Extra Sticker 11”, team: “Extra” },
{ id: “EXT-12”, name: “Extra Sticker 12”, team: “Extra” },
{ id: “EXT-13”, name: “Extra Sticker 13”, team: “Extra” },
{ id: “EXT-14”, name: “Extra Sticker 14”, team: “Extra” },
{ id: “EXT-15”, name: “Extra Sticker 15”, team: “Extra” },
{ id: “EXT-16”, name: “Extra Sticker 16”, team: “Extra” },
{ id: “EXT-17”, name: “Extra Sticker 17”, team: “Extra” },
{ id: “EXT-18”, name: “Extra Sticker 18”, team: “Extra” },
{ id: “EXT-19”, name: “Extra Sticker 19”, team: “Extra” },
{ id: “EXT-20”, name: “Extra Sticker 20”, team: “Extra” }
];

// Groups per team code prefix
const TEAM_GROUP = {
“México”:“A”,“Corea del Sur”:“A”,“Sudáfrica”:“A”,“R. Checa”:“A”,
“Canadá”:“B”,“Suiza”:“B”,“Catar”:“B”,“Bosnia”:“B”,
“Brasil”:“C”,“Marruecos”:“C”,“Escocia”:“C”,“Haití”:“C”,
“EEUU”:“D”,“Australia”:“D”,“Paraguay”:“D”,“Turquía”:“D”,
“Alemania”:“E”,“Ecuador”:“E”,“C. de Marfil”:“E”,“Curaçao”:“E”,
“Países Bajos”:“F”,“Japón”:“F”,“Túnez”:“F”,“Suecia”:“F”,
“Bélgica”:“G”,“Irán”:“G”,“Egipto”:“G”,“Nueva Zelanda”:“G”,
“España”:“H”,“Uruguay”:“H”,“Arabia Saudí”:“H”,“Cabo Verde”:“H”,
“Francia”:“I”,“Senegal”:“I”,“Noruega”:“I”,“Irak”:“I”,
“Argentina”:“J”,“Austria”:“J”,“Argelia”:“J”,“Jordania”:“J”,
“Portugal”:“K”,“Colombia”:“K”,“Uzbekistán”:“K”,“RD Congo”:“K”,
“Inglaterra”:“L”,“Croacia”:“L”,“Panamá”:“L”,“Ghana”:“L”,
“Especial”:“★”,“Extra”:“★”,
};

const FLAGS = {
“México”:“🇲🇽”,“Corea del Sur”:“🇰🇷”,“Sudáfrica”:“🇿🇦”,“R. Checa”:“🇨🇿”,
“Canadá”:“🇨🇦”,“Suiza”:“🇨🇭”,“Catar”:“🇶🇦”,“Bosnia”:“🇧🇦”,
“Brasil”:“🇧🇷”,“Marruecos”:“🇲🇦”,“Escocia”:“🏴󠁧󠁢󠁳󠁣󠁴󠁿”,“Haití”:“🇭🇹”,
“EEUU”:“🇺🇸”,“Australia”:“🇦🇺”,“Paraguay”:“🇵🇾”,“Turquía”:“🇹🇷”,
“Alemania”:“🇩🇪”,“Ecuador”:“🇪🇨”,“C. de Marfil”:“🇨🇮”,“Curaçao”:“🇨🇼”,
“Países Bajos”:“🇳🇱”,“Japón”:“🇯🇵”,“Túnez”:“🇹🇳”,“Suecia”:“🇸🇪”,
“Bélgica”:“🇧🇪”,“Irán”:“🇮🇷”,“Egipto”:“🇪🇬”,“Nueva Zelanda”:“🇳🇿”,
“España”:“🇪🇸”,“Uruguay”:“🇺🇾”,“Arabia Saudí”:“🇸🇦”,“Cabo Verde”:“🇨🇻”,
“Francia”:“🇫🇷”,“Senegal”:“🇸🇳”,“Noruega”:“🇳🇴”,“Irak”:“🇮🇶”,
“Argentina”:“🇦🇷”,“Austria”:“🇦🇹”,“Argelia”:“🇩🇿”,“Jordania”:“🇯🇴”,
“Portugal”:“🇵🇹”,“Colombia”:“🇨🇴”,“Uzbekistán”:“🇺🇿”,“RD Congo”:“🇨🇩”,
“Inglaterra”:“🏴󠁧󠁢󠁥󠁮󠁧󠁿”,“Croacia”:“🇭🇷”,“Panamá”:“🇵🇦”,“Ghana”:“🇬🇭”,
“Especial”:“⭐”,“Extra”:“✨”,
};

const GROUPS_LIST = [“A”,“B”,“C”,“D”,“E”,“F”,“G”,“H”,“I”,“J”,“K”,“L”];
const TOTAL = STICKER_DB.length;

function useLocalStorage(key, initial) {
const [val, setVal] = useState(() => {
try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
catch { return initial; }
});
const set = useCallback((v) => {
setVal(v);
try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
}, [key]);
return [val, set];
}

export default function App() {
const [view, setView] = useState(“album”);
const [owned, setOwned] = useLocalStorage(“panini2026v2_owned”, {});
const [repeated, setRepeated] = useLocalStorage(“panini2026v2_repeated”, {});
const [userName, setUserName] = useLocalStorage(“panini2026v2_name”, “”);
const [filterGroup, setFilterGroup] = useState(“all”);
const [filterStatus, setFilterStatus] = useState(“all”);
const [search, setSearch] = useState(””);
const [aiSuggestion, setAiSuggestion] = useState(””);
const [aiLoading, setAiLoading] = useState(false);
const [notification, setNotification] = useState(null);
const [lastScanned, setLastScanned] = useState(””);
const [scanResult, setScanResult] = useState(null);
const [nameInput, setNameInput] = useState(userName);
const [showNameModal, setShowNameModal] = useState(!userName);

const ownedCount = Object.values(owned).filter(Boolean).length;
const missingCount = TOTAL - ownedCount;
const repeatedTotal = Object.values(repeated).reduce((a,b)=>a+b,0);
const pct = Math.round((ownedCount/TOTAL)*100);

function notify(msg, type=“success”) {
setNotification({msg, type});
setTimeout(()=>setNotification(null), 2200);
}

function toggleOwned(id) {
const next = {…owned, [id]: !owned[id]};
setOwned(next);
const s = STICKER_DB.find(s=>s.id===id);
if(!owned[id]) notify(`✓ ${s?.name || id}`);
}

function addRepeated(id) {
const next = {…repeated, [id]: (repeated[id]||0)+1};
setRepeated(next);
notify(`+1 repetida: ${id} (${next[id]} total)`);
}

function removeRepeated(id) {
if(!repeated[id]) return;
const next = {…repeated, [id]: repeated[id]-1};
if(next[id]===0) delete next[id];
setRepeated(next);
}

function handleScanChange(e) {
const v = e.target.value.toUpperCase();
setLastScanned(v);
const found = STICKER_DB.find(s => s.id === v);
setScanResult(found || null);
}

async function getAiSuggestion() {
setAiLoading(true); setAiSuggestion(””);
const myMissing = STICKER_DB.filter(s=>!owned[s.id]).slice(0,15).map(s=>`${s.id} ${s.name}`);
const myRep = STICKER_DB.filter(s=>repeated[s.id]>0).slice(0,15).map(s=>`${s.id} ${s.name} x${repeated[s.id]}`);
try {
const res = await fetch(“https://api.anthropic.com/v1/messages”,{
method:“POST”,
headers:{“Content-Type”:“application/json”},
body:JSON.stringify({
model:“claude-sonnet-4-20250514”,
max_tokens:350,
messages:[{role:“user”,content:`Soy coleccionista del álbum Panini Mundial 2026. Me faltan: ${myMissing.join(", ")}. Ofrezco repetidas: ${myRep.join(", ") || "ninguna aún"}. Dame 3 consejos prácticos y motivadores para conseguir mis faltantes (intercambio, grupos, ferias). Máximo 140 palabras, en español, directo y con energía.`}]
})
});
const data = await res.json();
setAiSuggestion(data.content?.find(b=>b.type===“text”)?.text || “No se pudo generar.”);
} catch { setAiSuggestion(“Error al conectar.”); }
setAiLoading(false);
}

const allTeams = […new Set(STICKER_DB.map(s=>s.team))];

const filteredStickers = STICKER_DB.filter(s => {
const group = TEAM_GROUP[s.team] || “★”;
if(filterGroup!==“all” && group!==filterGroup) return false;
if(filterStatus===“missing” && owned[s.id]) return false;
if(filterStatus===“owned” && !owned[s.id]) return false;
if(search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase()) && !s.team.toLowerCase().includes(search.toLowerCase())) return false;
return true;
});

const groupStats = GROUPS_LIST.map(g => {
const gs = STICKER_DB.filter(s => TEAM_GROUP[s.team]===g);
return { g, total: gs.length, owned: gs.filter(s=>owned[s.id]).length };
});

const css = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{background:#0a0a0f;} input::placeholder{color:#3a4a6a;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#1e2a4a;border-radius:4px;} .sc:hover{transform:scale(1.04);transition:transform 0.12s;}`;

const S = {
app:{minHeight:“100vh”,background:”#0a0a0f”,color:”#f0ede8”,fontFamily:”‘Barlow Condensed’,sans-serif”},
header:{background:“linear-gradient(135deg,#1a1a2e,#0f3460)”,borderBottom:“3px solid #e94560”,position:“sticky”,top:0,zIndex:100},
hInner:{display:“flex”,alignItems:“center”,justifyContent:“space-between”,maxWidth:900,margin:“0 auto”,padding:“12px 16px”},
logo:{fontSize:20,fontWeight:900,letterSpacing:2,color:”#fff”,textTransform:“uppercase”},
pct:{background:”#e94560”,color:”#fff”,borderRadius:20,padding:“4px 14px”,fontSize:15,fontWeight:700},
nav:{display:“flex”,gap:4,padding:“0 16px”,maxWidth:900,margin:“0 auto”,borderTop:“1px solid #1e2a4a”,overflowX:“auto”},
nb:(a)=>({background:a?”#e94560”:“transparent”,color:a?”#fff”:”#8899bb”,border:“none”,padding:“9px 14px”,cursor:“pointer”,fontFamily:“inherit”,fontSize:13,fontWeight:700,letterSpacing:1,textTransform:“uppercase”,borderRadius:“0 0 6px 6px”,whiteSpace:“nowrap”}),
main:{maxWidth:900,margin:“0 auto”,padding:“18px 16px 80px”},
sg:{display:“grid”,gridTemplateColumns:“repeat(2,1fr)”,gap:12,marginBottom:20},
sc2:(ac)=>({background:”#12121f”,border:`2px solid ${ac}`,borderRadius:12,padding:14,textAlign:“center”}),
sn:(ac)=>({fontSize:34,fontWeight:900,color:ac,lineHeight:1}),
sl:{fontSize:11,color:”#8899bb”,textTransform:“uppercase”,letterSpacing:1,marginTop:4},
pb:{background:”#1e2a4a”,borderRadius:8,height:10,marginBottom:20,overflow:“hidden”},
pf:{background:“linear-gradient(90deg,#e94560,#f5a623)”,height:“100%”,borderRadius:8,transition:“width 0.4s”,width:`${pct}%`},
sec:{fontSize:17,fontWeight:800,letterSpacing:2,textTransform:“uppercase”,color:”#e94560”,marginBottom:12,paddingBottom:5,borderBottom:“1px solid #1e2a4a”},
fi:{display:“flex”,gap:8,flexWrap:“wrap”,marginBottom:14},
fb:(a)=>({background:a?”#0f3460”:”#12121f”,border:`1px solid ${a?"#e94560":"#1e2a4a"}`,color:a?”#e94560”:”#8899bb”,borderRadius:20,padding:“4px 12px”,cursor:“pointer”,fontFamily:“inherit”,fontSize:11,fontWeight:700}),
si:{background:”#12121f”,border:“1px solid #1e2a4a”,borderRadius:8,color:”#f0ede8”,padding:“8px 14px”,fontFamily:“inherit”,fontSize:14,width:“100%”,marginBottom:14,outline:“none”},
sg2:{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(130px,1fr))”,gap:7},
card:(io,hr)=>({background:io?”#0a1f0a”:”#12121f”,border:`2px solid ${io?"#22c55e":hr?"#f5a623":"#1e2a4a"}`,borderRadius:8,padding:“9px 7px”,cursor:“pointer”,position:“relative”}),
cn:(io)=>({fontSize:11,fontWeight:900,color:io?”#22c55e”:”#e94560”,letterSpacing:0.5}),
ct:{fontSize:13,fontWeight:700,color:”#f0ede8”,marginTop:2,lineHeight:1.2},
ctm:{fontSize:10,color:”#8899bb”,marginTop:1},
ck:{position:“absolute”,top:5,right:7,fontSize:14},
rb:{position:“absolute”,top:5,right:7,background:”#f5a623”,color:”#000”,borderRadius:10,fontSize:9,fontWeight:900,padding:“1px 5px”},
scanBox:{background:”#12121f”,border:“2px dashed #e94560”,borderRadius:14,padding:24,textAlign:“center”,marginBottom:18},
sinput:{background:”#0a0a0f”,border:“3px solid #e94560”,borderRadius:10,color:”#f0ede8”,fontSize:28,fontWeight:900,textAlign:“center”,padding:“10px 0”,width:“100%”,fontFamily:“inherit”,outline:“none”,marginTop:10,textTransform:“uppercase”},
sbtn:(c)=>({flex:1,background:c,color:”#fff”,border:“none”,borderRadius:8,padding:“11px 0”,cursor:“pointer”,fontFamily:“inherit”,fontSize:13,fontWeight:800,letterSpacing:1}),
aiBox:{background:”#0a1020”,border:“2px solid #0f3460”,borderRadius:12,padding:18,marginBottom:18},
aiBtn:{background:“linear-gradient(135deg,#e94560,#c0392b)”,color:”#fff”,border:“none”,borderRadius:8,padding:“11px 0”,cursor:“pointer”,fontFamily:“inherit”,fontSize:14,fontWeight:800,letterSpacing:1,width:“100%”,marginBottom:12},
exCard:{background:”#12121f”,border:“1px solid #1e2a4a”,borderRadius:10,padding:“12px 14px”,marginBottom:10},
exTitle:{fontSize:13,fontWeight:800,color:”#f5a623”,textTransform:“uppercase”,letterSpacing:1,marginBottom:7},
tagList:{display:“flex”,flexWrap:“wrap”,gap:5},
tag:(c)=>({background:c+“22”,border:`1px solid ${c}`,borderRadius:14,color:c,padding:“2px 9px”,fontSize:10,fontWeight:700}),
gc:{background:”#12121f”,border:“1px solid #1e2a4a”,borderRadius:10,padding:12,marginBottom:10},
notif:(t)=>({position:“fixed”,bottom:22,left:“50%”,transform:“translateX(-50%)”,background:t===“success”?”#22c55e”:”#e94560”,color:”#fff”,borderRadius:30,padding:“9px 22px”,fontWeight:700,fontSize:13,zIndex:9999,whiteSpace:“nowrap”,boxShadow:“0 4px 20px rgba(0,0,0,0.5)”}),
modal:{position:“fixed”,inset:0,background:“rgba(0,0,0,0.88)”,display:“flex”,alignItems:“center”,justifyContent:“center”,zIndex:999,padding:20},
mbox:{background:”#12121f”,border:“3px solid #e94560”,borderRadius:16,padding:26,maxWidth:320,width:“100%”,textAlign:“center”},
pBtn:{background:”#e94560”,color:”#fff”,border:“none”,borderRadius:8,padding:“12px 0”,width:“100%”,cursor:“pointer”,fontFamily:“inherit”,fontSize:15,fontWeight:800},
minput:{background:”#0a0a0f”,border:“2px solid #1e2a4a”,borderRadius:8,color:”#f0ede8”,fontSize:17,padding:“9px 12px”,width:“100%”,fontFamily:“inherit”,outline:“none”,margin:“12px 0”},
};

if(showNameModal) return (
<div style={S.app}>
<style>{css}</style>
<div style={S.modal}>
<div style={S.mbox}>
<div style={{fontSize:44,marginBottom:6}}>⚽</div>
<div style={{fontSize:22,fontWeight:900,color:”#e94560”,letterSpacing:2}}>PANINI 2026</div>
<div style={{color:”#8899bb”,fontSize:12,marginTop:4}}>{TOTAL} láminas · 48 equipos · jugadores reales</div>
<input style={S.minput} placeholder=“Tu nombre” value={nameInput} onChange={e=>setNameInput(e.target.value)}
onKeyDown={e=>{if(e.key===“Enter”&&nameInput.trim()){setUserName(nameInput.trim());setShowNameModal(false);}}}/>
<button style={S.pBtn} onClick={()=>{if(nameInput.trim()){setUserName(nameInput.trim());setShowNameModal(false);}}}>¡EMPEZAR!</button>
</div>
</div>
</div>
);

return (
<div style={S.app}>
<style>{css}</style>

```
  <div style={S.header}>
    <div style={S.hInner}>
      <div style={S.logo}>⚽ <span style={{color:"#e94560"}}>PANINI</span> 2026</div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <span style={{color:"#8899bb",fontSize:12}}>{userName}</span>
        <div style={S.pct}>{pct}%</div>
      </div>
    </div>
    <div style={S.nav}>
      {[{id:"album",l:"📒 Álbum"},{id:"scan",l:"⚡ Rápida"},{id:"exchange",l:"🔄 Cambio"},{id:"stats",l:"📊 Stats"}].map(n=>(
        <button key={n.id} style={S.nb(view===n.id)} onClick={()=>setView(n.id)}>{n.l}</button>
      ))}
    </div>
  </div>

  <div style={S.main}>

    {/* ── ALBUM ── */}
    {view==="album" && <>
      <div style={S.sg}>
        {[["#22c55e",ownedCount,"Pegadas"],["#e94560",missingCount,"Faltantes"],["#f5a623",repeatedTotal,"Repetidas"],["#818cf8",TOTAL,"Total"]].map(([c,v,l])=>(
          <div key={l} style={S.sc2(c)}>
            <div style={S.sn(c)}>{v}</div>
            <div style={S.sl}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#8899bb",marginBottom:5}}>
        <span>Progreso</span><span style={{color:"#e94560",fontWeight:700}}>{ownedCount}/{TOTAL}</span>
      </div>
      <div style={S.pb}><div style={S.pf}/></div>

      <div style={S.sec}>Láminas</div>
      <input style={S.si} placeholder="🔍 Buscar jugador, equipo o código (ej: COL-14)..." value={search} onChange={e=>setSearch(e.target.value)}/>

      <div style={S.fi}>
        {["all","missing","owned"].map(f=>(
          <button key={f} style={S.fb(filterStatus===f)} onClick={()=>setFilterStatus(f)}>
            {f==="all"?"Todas":f==="missing"?"Faltantes":"Pegadas"}
          </button>
        ))}
      </div>
      <div style={{...S.fi,marginBottom:18}}>
        <button style={S.fb(filterGroup==="all")} onClick={()=>setFilterGroup("all")}>★ Todos</button>
        {GROUPS_LIST.map(g=>(
          <button key={g} style={S.fb(filterGroup===g)} onClick={()=>setFilterGroup(g)}>Grupo {g}</button>
        ))}
      </div>

      <div style={S.sg2}>
        {filteredStickers.slice(0,280).map(s=>{
          const io=!!owned[s.id]; const rep=repeated[s.id]||0;
          return (
            <div key={s.id} className="sc" style={S.card(io,rep>0)} onClick={()=>toggleOwned(s.id)}>
              <div style={S.cn(io)}>{s.id}</div>
              <div style={S.ct}>{s.name}</div>
              <div style={S.ctm}>{FLAGS[s.team]||""} {s.team}</div>
              {io&&<div style={S.ck}>✓</div>}
              {rep>0&&<div style={S.rb}>×{rep}</div>}
            </div>
          );
        })}
      </div>
      {filteredStickers.length>280&&(
        <div style={{textAlign:"center",color:"#8899bb",fontSize:12,marginTop:10}}>
          Mostrando 280/{filteredStickers.length}. Usa los filtros para ver más.
        </div>
      )}
    </>}

    {/* ── SCAN ── */}
    {view==="scan" && <>
      <div style={S.sec}>Lámina rápida</div>
      <div style={S.scanBox}>
        <div style={{color:"#8899bb",fontSize:13}}>Escribe el código de la lámina</div>
        <div style={{color:"#6677aa",fontSize:11,marginTop:2}}>ej: COL-14 · ARG-17 · BRA-14 · FWC-5</div>
        <input style={S.sinput} placeholder="COL-14" value={lastScanned} onChange={handleScanChange}/>
        {scanResult && (
          <>
            <div style={{marginTop:12,fontSize:16,fontWeight:700,color:"#f0ede8"}}>
              {FLAGS[scanResult.team]||""} {scanResult.name}
              <span style={{color:"#8899bb",fontSize:12,marginLeft:8}}>{scanResult.team}</span>
            </div>
            <div style={{fontSize:12,color:owned[scanResult.id]?"#22c55e":"#8899bb",marginTop:3}}>
              {owned[scanResult.id]?"✓ Pegada":"Faltante"}{repeated[scanResult.id]?` · ${repeated[scanResult.id]} repetida(s)`:""}
            </div>
            <div style={{display:"flex",gap:10,marginTop:12}}>
              <button style={S.sbtn(owned[scanResult.id]?"#1e2a4a":"#22c55e")} onClick={()=>toggleOwned(scanResult.id)}>
                {owned[scanResult.id]?"✓ Marcar faltante":"✅ Marcar pegada"}
              </button>
              <button style={S.sbtn("#f5a623")} onClick={()=>addRepeated(scanResult.id)}>🔁 +1 Repetida</button>
            </div>
          </>
        )}
        {lastScanned && !scanResult && lastScanned.length>2 && (
          <div style={{marginTop:12,color:"#e94560",fontSize:13}}>Código no encontrado. Ejemplo: COL-14, ARG-17</div>
        )}
      </div>

      {Object.keys(repeated).length>0 && <>
        <div style={S.sec}>Mis repetidas ({Object.keys(repeated).length} tipos)</div>
        <div style={S.sg2}>
          {STICKER_DB.filter(s=>repeated[s.id]>0).map(s=>(
            <div key={s.id} style={{...S.card(owned[s.id],true)}}>
              <div style={S.cn(false)}>{s.id}</div>
              <div style={{...S.ct,fontSize:11}}>{s.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:7}}>
                <button onClick={e=>{e.stopPropagation();removeRepeated(s.id);}} style={{background:"#e94560",color:"#fff",border:"none",borderRadius:5,padding:"3px 9px",cursor:"pointer",fontSize:15,fontFamily:"inherit"}}>−</button>
                <span style={{fontWeight:900,color:"#f5a623",fontSize:17}}>×{repeated[s.id]}</span>
                <button onClick={e=>{e.stopPropagation();addRepeated(s.id);}} style={{background:"#22c55e",color:"#fff",border:"none",borderRadius:5,padding:"3px 9px",cursor:"pointer",fontSize:15,fontFamily:"inherit"}}>+</button>
              </div>
            </div>
          ))}
        </div>
      </>}
    </>}

    {/* ── EXCHANGE ── */}
    {view==="exchange" && <>
      <div style={S.sec}>Intercambio</div>
      <div style={S.aiBox}>
        <div style={{fontSize:14,fontWeight:800,color:"#818cf8",marginBottom:6,letterSpacing:1}}>🤖 ASISTENTE IA</div>
        <div style={{color:"#6677aa",fontSize:12,marginBottom:12}}>
          Análisis basado en tu álbum: {ownedCount} pegadas · {repeatedTotal} repetidas
        </div>
        <button style={S.aiBtn} onClick={getAiSuggestion} disabled={aiLoading}>
          {aiLoading?"⏳ Analizando...":"✨ Dame estrategias de intercambio"}
        </button>
        {aiSuggestion&&<div style={{fontSize:13,lineHeight:1.6,color:"#c0cce8",whiteSpace:"pre-wrap"}}>{aiSuggestion}</div>}
      </div>

      <div style={S.exCard}>
        <div style={S.exTitle}>📤 Lo que ofrezco (repetidas)</div>
        {Object.keys(repeated).length===0
          ? <div style={{color:"#6677aa",fontSize:12}}>Sin repetidas aún. Márcalas en "Lámina rápida".</div>
          : <div style={S.tagList}>{STICKER_DB.filter(s=>repeated[s.id]>0).map(s=>(
              <div key={s.id} style={S.tag("#f5a623")}>{s.id} ×{repeated[s.id]}</div>
            ))}</div>
        }
      </div>

      <div style={S.exCard}>
        <div style={S.exTitle}>📥 Lo que necesito (faltantes)</div>
        {missingCount===0
          ? <div style={{color:"#22c55e",fontWeight:700,fontSize:13}}>🎉 ¡Álbum completo!</div>
          : <>
              <div style={{color:"#6677aa",fontSize:11,marginBottom:7}}>{missingCount} faltantes · primeras {Math.min(missingCount,60)}:</div>
              <div style={S.tagList}>
                {STICKER_DB.filter(s=>!owned[s.id]).slice(0,60).map(s=>(
                  <div key={s.id} style={S.tag("#e94560")}>{s.id}</div>
                ))}
                {missingCount>60&&<div style={S.tag("#8899bb")}>+{missingCount-60} más</div>}
              </div>
            </>
        }
      </div>

      <div style={S.exCard}>
        <div style={S.exTitle}>📱 Texto para WhatsApp</div>
        <div style={{background:"#0a0a0f",borderRadius:8,padding:10,marginBottom:8,fontSize:11,color:"#c0cce8",lineHeight:1.7,whiteSpace:"pre-wrap"}}>
```

{`⚽ PANINI MUNDIAL 2026 — ${userName}

📤 OFREZCO:
${STICKER_DB.filter(s=>repeated[s.id]>0).map(s=>`${s.id}×${repeated[s.id]}`).join(” · “)||”(sin repetidas aún)”}

📥 NECESITO:
${STICKER_DB.filter(s=>!owned[s.id]).slice(0,30).map(s=>s.id).join(” · “)}${missingCount>30?` ... y ${missingCount-30} más`:””}

💬 ¡Hablemos para cambiar!`} </div> <button style={{...S.pBtn,fontSize:12,marginTop:0}} onClick={()=>{ const text=`⚽ PANINI MUNDIAL 2026 — ${userName}\n\n📤 OFREZCO:\n${STICKER_DB.filter(s=>repeated[s.id]>0).map(s=>`${s.id}×${repeated[s.id]}`).join(” · “)||”(sin repetidas)”}\n\n📥 NECESITO:\n${STICKER_DB.filter(s=>!owned[s.id]).slice(0,30).map(s=>s.id).join(” · “)}${missingCount>30?` ... y ${missingCount-30} más`:””}\n\n💬 ¡Hablemos para cambiar!`;
navigator.clipboard?.writeText(text).then(()=>notify(“📋 Copiado para WhatsApp!”));
}}>📋 Copiar para WhatsApp</button>
</div>
</>}

```
    {/* ── STATS ── */}
    {view==="stats" && <>
      <div style={S.sec}>Progreso por grupo</div>
      {groupStats.map(({g,total,owned:ow})=>{
        const p=Math.round((ow/total)*100);
        return (
          <div key={g} style={S.gc}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <span style={{fontWeight:800,color:"#e94560",fontSize:15,letterSpacing:2}}>GRUPO {g}</span>
              <span style={{fontWeight:700,color:p===100?"#22c55e":p>50?"#f5a623":"#8899bb",fontSize:13}}>{p}% · {ow}/{total}</span>
            </div>
            <div style={{background:"#0a0a0f",borderRadius:4,height:5,overflow:"hidden"}}>
              <div style={{background:p===100?"#22c55e":"linear-gradient(90deg,#e94560,#f5a623)",width:`${p}%`,height:"100%",borderRadius:4,transition:"width 0.3s"}}/>
            </div>
          </div>
        );
      })}

      <div style={{...S.sec,marginTop:20}}>Datos del álbum</div>
      <div style={{background:"#12121f",border:"1px solid #1e2a4a",borderRadius:10,padding:14}}>
        {[["Total láminas",TOTAL],["Pegadas",ownedCount],["Faltantes",missingCount],["Repetidas",repeatedTotal],["% completado",`${pct}%`],["Sobres estimados restantes",`~${Math.ceil(missingCount*1.3/7)} sobres`]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1e2a4a",fontSize:13}}>
            <span style={{color:"#8899bb"}}>{l}</span>
            <span style={{fontWeight:700}}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{marginTop:18,textAlign:"center"}}>
        <button style={{background:"#1e2a4a",color:"#e94560",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700}}
          onClick={()=>{if(confirm("¿Borrar todo el progreso?")){setOwned({});setRepeated({});notify("Progreso borrado","error");}}}>
          🗑 Reiniciar álbum
        </button>
      </div>
    </>}
  </div>

  {notification&&<div style={S.notif(notification.type)}>{notification.msg}</div>}
</div>
```

);
}
