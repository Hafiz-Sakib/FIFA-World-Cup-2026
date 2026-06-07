import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  CheckCircle,
  XCircle,
  RotateCcw,
  ChevronRight,
  Star,
  Zap,
  Award,
  Brain,
  Clock,
  Shield,
} from "lucide-react";

const ALL_QUESTIONS = [
  // ── HISTORY ──────────────────────────────────────────────
  {
    id: 1,
    category: "History",
    difficulty: "Easy",
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Brazil", "Argentina", "Italy"],
    answer: 1,
    explanation:
      "Brazil has won the World Cup 5 times (1958, 1962, 1970, 1994, 2002).",
  },
  {
    id: 2,
    category: "History",
    difficulty: "Easy",
    question: "Which nation won the inaugural FIFA World Cup in 1930?",
    options: ["Brazil", "Argentina", "Uruguay", "Italy"],
    answer: 2,
    explanation:
      "Uruguay won the first World Cup in 1930, hosted on home soil.",
  },
  {
    id: 3,
    category: "History",
    difficulty: "Easy",
    question: "What colour jersey does Brazil traditionally wear?",
    options: ["White", "Blue", "Yellow", "Green"],
    answer: 2,
    explanation:
      "Brazil is famous for their iconic yellow (Canarinho) jerseys.",
  },
  {
    id: 4,
    category: "History",
    difficulty: "Easy",
    question: "Who won the 2018 FIFA World Cup?",
    options: ["Brazil", "Croatia", "France", "Belgium"],
    answer: 2,
    explanation:
      "France won the 2018 World Cup in Russia, defeating Croatia 4-2 in the final.",
  },
  {
    id: 5,
    category: "History",
    difficulty: "Easy",
    question: "The 2022 FIFA World Cup was held in which country?",
    options: ["Saudi Arabia", "UAE", "Qatar", "Bahrain"],
    answer: 2,
    explanation:
      "Qatar hosted the 2022 World Cup, the first in the Middle East.",
  },
  {
    id: 6,
    category: "History",
    difficulty: "Easy",
    question: "Which country hosted the 2014 FIFA World Cup?",
    options: ["Argentina", "Brazil", "Colombia", "Chile"],
    answer: 1,
    explanation:
      "Brazil hosted the 2014 World Cup. Germany won the title, beating Argentina 1-0 in the final.",
  },
  {
    id: 7,
    category: "History",
    difficulty: "Easy",
    question: "Who won the 2014 FIFA World Cup?",
    options: ["Argentina", "Brazil", "Germany", "France"],
    answer: 2,
    explanation:
      "Germany beat Argentina 1-0 (AET) in the 2014 final in Rio de Janeiro.",
  },
  {
    id: 8,
    category: "History",
    difficulty: "Easy",
    question: "Which country won the 2010 FIFA World Cup?",
    options: ["Brazil", "Argentina", "Spain", "Germany"],
    answer: 2,
    explanation:
      "Spain won their first World Cup in 2010, beating Netherlands 1-0 (AET) in Johannesburg.",
  },
  {
    id: 9,
    category: "History",
    difficulty: "Easy",
    question: "In which year did Argentina win their first World Cup?",
    options: ["1974", "1978", "1982", "1986"],
    answer: 1,
    explanation: "Argentina won their first World Cup in 1978, hosted at home.",
  },
  {
    id: 10,
    category: "History",
    difficulty: "Medium",
    question: "Which player won the Golden Ball at the 2022 World Cup?",
    options: [
      "Kylian Mbappé",
      "Lionel Messi",
      "Julián Álvarez",
      "Antoine Griezmann",
    ],
    answer: 1,
    explanation:
      "Lionel Messi won the Golden Ball as the best player at the 2022 World Cup in Qatar.",
  },
  {
    id: 11,
    category: "History",
    difficulty: "Medium",
    question: "Who was the top scorer at the 2022 FIFA World Cup?",
    options: [
      "Lionel Messi",
      "Kylian Mbappé",
      "Olivier Giroud",
      "Julián Álvarez",
    ],
    answer: 1,
    explanation:
      "Kylian Mbappé scored 8 goals at the 2022 World Cup, winning the Golden Boot.",
  },
  {
    id: 12,
    category: "History",
    difficulty: "Medium",
    question: "Which country hosted the 1998 FIFA World Cup?",
    options: ["England", "Spain", "France", "Italy"],
    answer: 2,
    explanation:
      "France hosted and won the 1998 World Cup, beating Brazil 3-0 in the final.",
  },
  {
    id: 13,
    category: "History",
    difficulty: "Medium",
    question: "The 2002 World Cup was jointly hosted by which two countries?",
    options: [
      "Japan & China",
      "South Korea & Japan",
      "China & South Korea",
      "Japan & Australia",
    ],
    answer: 1,
    explanation:
      "Japan and South Korea jointly hosted the 2002 World Cup — the first in Asia.",
  },
  {
    id: 14,
    category: "History",
    difficulty: "Medium",
    question: "Which team did England beat in the 1966 World Cup final?",
    options: ["France", "Portugal", "West Germany", "Soviet Union"],
    answer: 2,
    explanation:
      "England beat West Germany 4-2 (AET) in the 1966 final at Wembley.",
  },
  {
    id: 15,
    category: "History",
    difficulty: "Medium",
    question:
      "Which African nation first reached the World Cup quarter-finals in 1990?",
    options: ["Nigeria", "Cameroon", "Senegal", "Morocco"],
    answer: 1,
    explanation:
      "Cameroon reached the quarter-finals at Italia 1990, becoming the first African team to do so.",
  },
  {
    id: 16,
    category: "History",
    difficulty: "Medium",
    question: "Who scored the famous 'Hand of God' goal in 1986?",
    options: ["Pelé", "Ronaldo", "Diego Maradona", "Romario"],
    answer: 2,
    explanation:
      "Diego Maradona scored the infamous 'Hand of God' goal against England at the 1986 World Cup in Mexico.",
  },
  {
    id: 17,
    category: "History",
    difficulty: "Hard",
    question: "How many times has Italy won the FIFA World Cup?",
    options: ["2", "3", "4", "5"],
    answer: 2,
    explanation:
      "Italy has won the World Cup 4 times: 1934, 1938, 1982, and 2006.",
  },
  {
    id: 18,
    category: "History",
    difficulty: "Hard",
    question:
      "Which World Cup final ended 0-0 after extra time, decided by penalties?",
    options: ["1990", "1994", "2006", "Both 1994 and 2006"],
    answer: 3,
    explanation:
      "Both the 1994 final (Brazil vs Italy) and the 2006 final (Italy vs France) ended 0-0 and were decided by penalties.",
  },
  {
    id: 19,
    category: "History",
    difficulty: "Hard",
    question: "Which country has hosted the World Cup twice?",
    options: ["England", "France", "Italy", "Mexico"],
    answer: 3,
    explanation:
      "Mexico hosted the World Cup in both 1970 and 1986, and will co-host again in 2026.",
  },
  {
    id: 20,
    category: "History",
    difficulty: "Hard",
    question: "Who scored the winning goal in the 2010 World Cup final?",
    options: ["Fernando Torres", "David Villa", "Andrés Iniesta", "Xavi"],
    answer: 2,
    explanation:
      "Andrés Iniesta scored in the 116th minute of extra time to give Spain a 1-0 win over the Netherlands.",
  },

  // ── RECORDS ──────────────────────────────────────────────
  {
    id: 21,
    category: "Records",
    difficulty: "Hard",
    question: "Who is the all-time top scorer in FIFA World Cup history?",
    options: ["Pelé", "Ronaldo (Brazil)", "Miroslav Klose", "Just Fontaine"],
    answer: 2,
    explanation:
      "Miroslav Klose of Germany holds the record with 16 World Cup goals.",
  },
  {
    id: 22,
    category: "Records",
    difficulty: "Hard",
    question:
      "Which goalkeeper has the most clean sheets in World Cup history?",
    options: [
      "Peter Shilton",
      "Gianluigi Buffon",
      "Sepp Maier",
      "Fabien Barthez",
    ],
    answer: 0,
    explanation:
      "Peter Shilton of England holds the record with 10 World Cup clean sheets.",
  },
  {
    id: 23,
    category: "Records",
    difficulty: "Medium",
    question: "Which country has appeared in the most World Cup finals?",
    options: ["Brazil", "Germany", "Argentina", "Italy"],
    answer: 1,
    explanation:
      "Germany (including West Germany) has appeared in 8 World Cup finals.",
  },
  {
    id: 24,
    category: "Records",
    difficulty: "Hard",
    question: "What is the record margin of victory in a World Cup match?",
    options: ["7-0", "9-0", "10-1", "12-0"],
    answer: 2,
    explanation:
      "Hungary beat El Salvador 10-1 in 1982, the biggest ever World Cup win.",
  },
  {
    id: 25,
    category: "Records",
    difficulty: "Hard",
    question:
      "Which team scored the most goals in a single World Cup tournament?",
    options: [
      "Hungary (1954)",
      "France (1998)",
      "Brazil (1970)",
      "Germany (2014)",
    ],
    answer: 0,
    explanation:
      "Hungary scored 27 goals in the 1954 World Cup, the most by any team in a single tournament.",
  },
  {
    id: 26,
    category: "Records",
    difficulty: "Hard",
    question: "Who scored the fastest goal in World Cup history?",
    options: ["Clint Dempsey", "Hakan Şükür", "Bryan Robson", "Emile Heskey"],
    answer: 1,
    explanation:
      "Hakan Şükür of Turkey scored after just 11 seconds against South Korea in 2002.",
  },
  {
    id: 27,
    category: "Records",
    difficulty: "Medium",
    question:
      "Who holds the record for most World Cup appearances as a player?",
    options: [
      "Lothar Matthäus",
      "Gianluigi Buffon",
      "Lionel Messi",
      "Rafael Márquez",
    ],
    answer: 0,
    explanation:
      "Lothar Matthäus of Germany played in 25 World Cup matches across 5 tournaments.",
  },
  {
    id: 28,
    category: "Records",
    difficulty: "Hard",
    question: "Just Fontaine scored how many goals in the 1958 World Cup?",
    options: ["11", "12", "13", "14"],
    answer: 2,
    explanation:
      "Just Fontaine of France scored 13 goals at the 1958 World Cup — a single-tournament record that still stands.",
  },
  {
    id: 29,
    category: "Records",
    difficulty: "Hard",
    question: "Which player was sent off in a World Cup final?",
    options: ["Zinedine Zidane", "Luis Suárez", "Marco Materazzi", "Ronaldo"],
    answer: 0,
    explanation:
      "Zinedine Zidane was infamously sent off in the 2006 World Cup final after headbutting Marco Materazzi.",
  },
  {
    id: 30,
    category: "Records",
    difficulty: "Medium",
    question: "Which country has never missed a World Cup?",
    options: ["France", "Germany", "Brazil", "Argentina"],
    answer: 2,
    explanation:
      "Brazil is the only nation to have qualified for every single FIFA World Cup since 1930.",
  },
  {
    id: 31,
    category: "Records",
    difficulty: "Hard",
    question:
      "How many goals were scored in the Germany vs Brazil semi-final at the 2014 World Cup?",
    options: ["5", "6", "7", "8"],
    answer: 3,
    explanation:
      "Germany thrashed Brazil 7-1 in Belo Horizonte — one of the most shocking results in World Cup history.",
  },
  {
    id: 32,
    category: "Records",
    difficulty: "Medium",
    question: "Which player has won the most World Cup winners' medals?",
    options: ["Pelé", "Ronaldo (Brazil)", "Cafú", "Didier Deschamps"],
    answer: 0,
    explanation:
      "Pelé won 3 World Cup winners' medals (1958, 1962, 1970) — more than any other player.",
  },
  {
    id: 33,
    category: "Records",
    difficulty: "Hard",
    question: "Which World Cup had the highest average goals per game?",
    options: ["1930", "1950", "1954", "1958"],
    answer: 2,
    explanation:
      "The 1954 World Cup in Switzerland averaged 5.38 goals per game, the highest ever.",
  },
  {
    id: 34,
    category: "Records",
    difficulty: "Hard",
    question: "Who is the youngest player ever to score in a World Cup?",
    options: ["Pelé", "Cesc Fàbregas", "Wayne Rooney", "Rubén Marcos"],
    answer: 0,
    explanation:
      "Pelé scored at 17 years and 239 days at the 1958 World Cup — still the record.",
  },
  {
    id: 35,
    category: "Records",
    difficulty: "Medium",
    question: "How many times has France won the World Cup?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation:
      "France has won the World Cup twice — in 1998 (at home) and 2018 (in Russia).",
  },

  // ── 2026 EDITION ──────────────────────────────────────────
  {
    id: 36,
    category: "2026 Edition",
    difficulty: "Easy",
    question: "Where is FIFA World Cup 2026 being hosted?",
    options: [
      "USA only",
      "USA & Canada",
      "USA, Canada & Mexico",
      "Mexico & USA",
    ],
    answer: 2,
    explanation:
      "The 2026 World Cup is jointly hosted by USA, Canada, and Mexico — the first World Cup with 3 host countries.",
  },
  {
    id: 37,
    category: "2026 Edition",
    difficulty: "Easy",
    question: "How many teams will participate in the 2026 FIFA World Cup?",
    options: ["32", "40", "48", "64"],
    answer: 2,
    explanation:
      "FIFA expanded the tournament to 48 teams from the previous 32-team format.",
  },
  {
    id: 38,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "How many groups are in the 2026 FIFA World Cup?",
    options: ["8", "10", "12", "16"],
    answer: 2,
    explanation: "The 2026 World Cup features 12 groups of 4 teams each.",
  },
  {
    id: 39,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "Which stadium will host the 2026 World Cup Final?",
    options: [
      "SoFi Stadium",
      "AT&T Stadium",
      "MetLife Stadium",
      "Hard Rock Stadium",
    ],
    answer: 2,
    explanation:
      "MetLife Stadium in New York/New Jersey will host the 2026 World Cup Final.",
  },
  {
    id: 40,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "When does the 2026 FIFA World Cup start?",
    options: ["June 1", "June 8", "June 11", "June 12"],
    answer: 3,
    explanation: "The 2026 World Cup kicks off on June 12, 2026.",
  },
  {
    id: 41,
    category: "2026 Edition",
    difficulty: "Easy",
    question: "How many matches will be played in total at the 2026 World Cup?",
    options: ["48", "64", "80", "104"],
    answer: 3,
    explanation:
      "The 2026 World Cup will feature 104 matches, compared to 64 in the 2022 edition.",
  },
  {
    id: 42,
    category: "2026 Edition",
    difficulty: "Easy",
    question: "How many host countries are there for the 2026 World Cup?",
    options: ["1", "2", "3", "4"],
    answer: 2,
    explanation:
      "Three countries — USA, Canada, and Mexico — jointly host the 2026 World Cup.",
  },
  {
    id: 43,
    category: "2026 Edition",
    difficulty: "Medium",
    question:
      "Which of these cities is NOT a host city for the 2026 World Cup?",
    options: ["Seattle", "Boston", "Chicago", "Miami"],
    answer: 2,
    explanation:
      "Chicago is not a host city. US cities include New York/NJ, LA, Dallas, Miami, SF, Atlanta, Boston, Kansas City, Philadelphia, Seattle, and Houston.",
  },
  {
    id: 44,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "Which Mexican stadium will host matches at the 2026 World Cup?",
    options: [
      "Estadio Azteca",
      "Estadio Jalisco",
      "Estadio Universitario",
      "Estadio Olímpico",
    ],
    answer: 0,
    explanation:
      "Estadio Azteca in Mexico City is one of the 2026 host venues — it will become the first stadium to host World Cup matches three times (1970, 1986, 2026).",
  },
  {
    id: 45,
    category: "2026 Edition",
    difficulty: "Medium",
    question:
      "How many teams from each group advance to the Round of 32 in 2026?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation:
      "The top 2 from each of the 12 groups advance automatically, plus 8 best third-placed teams — totalling 32 teams.",
  },
  {
    id: 46,
    category: "2026 Edition",
    difficulty: "Hard",
    question: "Which Canadian city will host 2026 World Cup matches?",
    options: ["Montreal", "Toronto", "Vancouver", "Both Toronto and Vancouver"],
    answer: 3,
    explanation:
      "Both Toronto (BMO Field) and Vancouver (BC Place) are Canadian host cities for the 2026 World Cup.",
  },
  {
    id: 47,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "In which group is Brazil placed for the 2026 World Cup?",
    options: ["Group A", "Group B", "Group C", "Group D"],
    answer: 2,
    explanation: "Brazil is in Group C alongside Morocco, Haiti, and Scotland.",
  },
  {
    id: 48,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "Which group contains Argentina at the 2026 World Cup?",
    options: ["Group H", "Group I", "Group J", "Group K"],
    answer: 2,
    explanation:
      "Argentina is in Group J alongside Algeria, Austria, and Jordan.",
  },
  {
    id: 49,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "England is placed in which group for the 2026 World Cup?",
    options: ["Group J", "Group K", "Group L", "Group M"],
    answer: 2,
    explanation: "England is in Group L alongside Croatia, Ghana, and Panama.",
  },
  {
    id: 50,
    category: "2026 Edition",
    difficulty: "Hard",
    question: "Which group contains France at the 2026 World Cup?",
    options: ["Group G", "Group H", "Group I", "Group J"],
    answer: 2,
    explanation: "France is in Group I alongside Senegal, Iraq, and Norway.",
  },
  {
    id: 51,
    category: "2026 Edition",
    difficulty: "Hard",
    question: "Which two teams are in Group B along with Canada and Qatar?",
    options: [
      "Bosnia-Herzegovina & Switzerland",
      "USA & Mexico",
      "Scotland & Ireland",
      "Serbia & Croatia",
    ],
    answer: 0,
    explanation:
      "Group B consists of Canada, Bosnia-Herzegovina, Qatar, and Switzerland.",
  },
  {
    id: 52,
    category: "2026 Edition",
    difficulty: "Hard",
    question: "Germany is grouped with which teams in the 2026 World Cup?",
    options: [
      "Brazil, Argentina, Spain",
      "Curacao, Ivory Coast, Ecuador",
      "France, Norway, Senegal",
      "Netherlands, Japan, Sweden",
    ],
    answer: 1,
    explanation:
      "Germany is in Group E with Curaçao, Ivory Coast, and Ecuador.",
  },
  {
    id: 53,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "When does the 2026 FIFA World Cup final take place?",
    options: ["July 15", "July 17", "July 19", "July 21"],
    answer: 2,
    explanation:
      "The 2026 World Cup final is scheduled for July 19, 2026 at MetLife Stadium.",
  },
  {
    id: 54,
    category: "2026 Edition",
    difficulty: "Hard",
    question:
      "Which is the only CONCACAF nation other than USA, Canada and Mexico at the 2026 World Cup?",
    options: ["Honduras", "Costa Rica", "Panama", "Jamaica"],
    answer: 2,
    explanation:
      "Panama qualified from CONCACAF alongside the three host nations. They are in Group L.",
  },
  {
    id: 55,
    category: "2026 Edition",
    difficulty: "Hard",
    question: "Which group contains Spain at the 2026 World Cup?",
    options: ["Group F", "Group G", "Group H", "Group I"],
    answer: 2,
    explanation:
      "Spain is in Group H alongside Cape Verde, Saudi Arabia, and Uruguay.",
  },

  // ── PLAYERS ──────────────────────────────────────────────
  {
    id: 56,
    category: "Players",
    difficulty: "Easy",
    question: "Lionel Messi plays for which national team?",
    options: ["Brazil", "Uruguay", "Argentina", "Chile"],
    answer: 2,
    explanation:
      "Lionel Messi represents Argentina and led them to World Cup glory in 2022.",
  },
  {
    id: 57,
    category: "Players",
    difficulty: "Easy",
    question: "Which country does Kylian Mbappé represent?",
    options: ["Belgium", "France", "Ivory Coast", "Senegal"],
    answer: 1,
    explanation:
      "Kylian Mbappé is French and was the top scorer at the 2022 World Cup.",
  },
  {
    id: 58,
    category: "Players",
    difficulty: "Easy",
    question: "Cristiano Ronaldo plays for which national team?",
    options: ["Spain", "Brazil", "Portugal", "Italy"],
    answer: 2,
    explanation:
      "Cristiano Ronaldo is Portuguese and has captained Portugal at multiple World Cups.",
  },
  {
    id: 59,
    category: "Players",
    difficulty: "Medium",
    question:
      "Which Brazilian legend scored a famous bicycle kick against Wales in the 1958 World Cup?",
    options: ["Garrincha", "Zico", "Pelé", "Ronaldo"],
    answer: 2,
    explanation:
      "Pelé scored a stunning bicycle kick in the 1958 semi-final — he was only 17.",
  },
  {
    id: 60,
    category: "Players",
    difficulty: "Medium",
    question:
      "Which player captained France to World Cup glory in both 1998 and as manager in 2018?",
    options: [
      "Laurent Blanc",
      "Zinedine Zidane",
      "Didier Deschamps",
      "Thierry Henry",
    ],
    answer: 2,
    explanation:
      "Didier Deschamps captained France in 1998 and managed them to the 2018 title — one of only three people to win the World Cup as both player and manager.",
  },
  {
    id: 61,
    category: "Players",
    difficulty: "Medium",
    question: "Who won the Golden Boot at the 2018 FIFA World Cup?",
    options: [
      "Antoine Griezmann",
      "Harry Kane",
      "Romelu Lukaku",
      "Cristiano Ronaldo",
    ],
    answer: 1,
    explanation:
      "Harry Kane of England scored 6 goals to win the Golden Boot at Russia 2018.",
  },
  {
    id: 62,
    category: "Players",
    difficulty: "Medium",
    question:
      "Which goalkeeper saved a record 5 penalties at the 2022 World Cup?",
    options: [
      "Alisson Becker",
      "Dominik Livaković",
      "Emiliano Martínez",
      "Yann Sommer",
    ],
    answer: 2,
    explanation:
      "Emiliano Martínez (Dibu) saved 5 penalties across the knockout rounds and the final shoot-out to help Argentina win in 2022.",
  },
  {
    id: 63,
    category: "Players",
    difficulty: "Hard",
    question:
      "Which player scored in every game of the 1970 World Cup for Brazil?",
    options: ["Pelé", "Jairzinho", "Tostão", "Rivelino"],
    answer: 1,
    explanation:
      "Jairzinho scored in all 6 of Brazil's games at the 1970 World Cup — an unprecedented feat.",
  },
  {
    id: 64,
    category: "Players",
    difficulty: "Hard",
    question: "Who was the first player to score in four different World Cups?",
    options: ["Pelé", "Uwe Seeler", "Cristiano Ronaldo", "Miroslav Klose"],
    answer: 1,
    explanation:
      "Uwe Seeler of West Germany scored in 1958, 1962, 1966, and 1970 — later matched by Pelé and others.",
  },
  {
    id: 65,
    category: "Players",
    difficulty: "Hard",
    question:
      "Which player won both the Golden Boot and Golden Ball at the 2022 World Cup?",
    options: [
      "Kylian Mbappé",
      "Lionel Messi",
      "Emiliano Martínez",
      "Luka Modrić",
    ],
    answer: 1,
    explanation:
      "Lionel Messi won the Golden Ball (best player) while Kylian Mbappé won the Golden Boot (top scorer). Martínez won the Golden Glove.",
  },

  // ── STADIUMS & VENUES ────────────────────────────────────
  {
    id: 66,
    category: "Venues",
    difficulty: "Medium",
    question: "In which city is the Estadio Azteca located?",
    options: ["Guadalajara", "Monterrey", "Mexico City", "Puebla"],
    answer: 2,
    explanation:
      "Estadio Azteca is in Mexico City and has hosted the 1970 and 1986 World Cup finals.",
  },
  {
    id: 67,
    category: "Venues",
    difficulty: "Easy",
    question:
      "Which country's Maracanã stadium hosted the 2014 World Cup final?",
    options: ["Argentina", "Brazil", "Chile", "Uruguay"],
    answer: 1,
    explanation:
      "The Maracanã in Rio de Janeiro, Brazil, hosted the 2014 World Cup final.",
  },
  {
    id: 68,
    category: "Venues",
    difficulty: "Medium",
    question:
      "What is the approximate capacity of MetLife Stadium, the 2026 final venue?",
    options: ["65,000", "75,000", "82,000", "90,000"],
    answer: 2,
    explanation:
      "MetLife Stadium has a capacity of over 82,000 making it one of the largest in the NFL.",
  },
  {
    id: 69,
    category: "Venues",
    difficulty: "Hard",
    question: "Which 2026 host stadium is nicknamed 'The Jerry World'?",
    options: [
      "SoFi Stadium",
      "AT&T Stadium",
      "Lumen Field",
      "Arrowhead Stadium",
    ],
    answer: 1,
    explanation:
      "AT&T Stadium in Arlington, Texas — nicknamed 'The Jerry World' after Cowboys owner Jerry Jones — is one of the 2026 host venues.",
  },
  {
    id: 70,
    category: "Venues",
    difficulty: "Medium",
    question: "Which city's stadium hosted the 2006 World Cup final?",
    options: ["Munich", "Hamburg", "Frankfurt", "Berlin"],
    answer: 3,
    explanation:
      "The Olympiastadion in Berlin hosted the 2006 World Cup final, where Italy beat France on penalties.",
  },

  // ── GENERAL / FUN ────────────────────────────────────────
  {
    id: 71,
    category: "History",
    difficulty: "Easy",
    question: "How often is the FIFA World Cup held?",
    options: [
      "Every 2 years",
      "Every 3 years",
      "Every 4 years",
      "Every 5 years",
    ],
    answer: 2,
    explanation: "The FIFA World Cup is held every 4 years.",
  },
  {
    id: 72,
    category: "History",
    difficulty: "Easy",
    question: "What shape is a standard football (soccer ball)?",
    options: ["Cube", "Sphere", "Cylinder", "Pyramid"],
    answer: 1,
    explanation:
      "A football is a sphere, typically made of 32 panels (pentagons and hexagons).",
  },
  {
    id: 73,
    category: "History",
    difficulty: "Medium",
    question: "Which continent has won the most World Cup titles?",
    options: ["Europe", "South America", "North America", "Africa"],
    answer: 0,
    explanation:
      "Europe has won 12 World Cups (Italy ×4, Germany ×4, France ×2, England ×1, Spain ×1) vs South America's 10.",
  },
  {
    id: 74,
    category: "Records",
    difficulty: "Medium",
    question:
      "What was the score in the famous 1970 World Cup final between Brazil and Italy?",
    options: ["2-1", "3-2", "4-1", "3-1"],
    answer: 2,
    explanation:
      "Brazil beat Italy 4-1 in the 1970 World Cup final in Mexico City — Pelé scored the opening goal.",
  },
  {
    id: 75,
    category: "History",
    difficulty: "Hard",
    question:
      "Which nation boycotted the 1966 World Cup over a dispute about African representation?",
    options: [
      "South Africa",
      "Egypt",
      "All African nations except Morocco",
      "Nigeria",
    ],
    answer: 2,
    explanation:
      "All African nations except Morocco boycotted the 1966 World Cup, protesting FIFA's allocation of only half a place to Africa.",
  },
  {
    id: 76,
    category: "2026 Edition",
    difficulty: "Easy",
    question:
      "USA, Canada and Mexico will all host the World Cup in 2026. Which of them hosted previously?",
    options: ["Only USA", "Only Mexico", "USA and Mexico", "All three"],
    answer: 2,
    explanation:
      "The USA hosted in 1994 and Mexico hosted in 1970 and 1986. Canada has never hosted before.",
  },
  {
    id: 77,
    category: "Players",
    difficulty: "Medium",
    question:
      "Which German player scored the winning goal in the 2014 World Cup final?",
    options: ["Thomas Müller", "Toni Kroos", "Mario Götze", "Miroslav Klose"],
    answer: 2,
    explanation:
      "Mario Götze, a substitute, scored the winning goal in the 113th minute of extra time.",
  },
  {
    id: 78,
    category: "Records",
    difficulty: "Hard",
    question: "Which player has appeared in the most World Cup final matches?",
    options: ["Pelé", "Cafu", "Lothar Matthäus", "Paolo Maldini"],
    answer: 1,
    explanation:
      "Cafu played in three World Cup finals (1994, 1998, 2002), winning twice with Brazil.",
  },
  {
    id: 79,
    category: "History",
    difficulty: "Medium",
    question: "Who was the coach of France when they won the 2018 World Cup?",
    options: [
      "Laurent Blanc",
      "Raymond Domenech",
      "Didier Deschamps",
      "Zinedine Zidane",
    ],
    answer: 2,
    explanation: "Didier Deschamps coached France to the 2018 title in Russia.",
  },
  {
    id: 80,
    category: "2026 Edition",
    difficulty: "Medium",
    question: "How many teams from Africa will qualify for the 2026 World Cup?",
    options: ["5", "6", "8", "9"],
    answer: 3,
    explanation:
      "With the expanded 48-team format, Africa gets 9 places at the 2026 World Cup, up from 5 in 2022.",
  },
];

const CATEGORY_COLORS = {
  History: {
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
    text: "#60A5FA",
  },
  "2026 Edition": {
    bg: "rgba(22,163,74,0.12)",
    border: "rgba(22,163,74,0.3)",
    text: "#22C55E",
  },
  Records: {
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.3)",
    text: "#EAB308",
  },
  Players: {
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.3)",
    text: "#C084FC",
  },
  Venues: {
    bg: "rgba(20,184,166,0.12)",
    border: "rgba(20,184,166,0.3)",
    text: "#2DD4BF",
  },
};

const DIFFICULTY_COLORS = {
  Easy: { bg: "rgba(22,163,74,0.12)", text: "#4ADE80" },
  Medium: { bg: "rgba(234,179,8,0.12)", text: "#FCD34D" },
  Hard: { bg: "rgba(239,68,68,0.12)", text: "#F87171" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const [mode, setMode] = useState("menu"); // menu | playing | result
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Combined");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);

  const categories = [
    "All",
    "History",
    "Records",
    "2026 Edition",
    "Players",
    "Venues",
  ];
  const difficulties = ["Combined", "Easy", "Medium", "Hard"];

  useEffect(() => {
    if (timerActive && timeLeft > 0 && !answered) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(-1);
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft, answered]);

  function startQuiz() {
    let pool = ALL_QUESTIONS;
    if (selectedCategory !== "All")
      pool = pool.filter((q) => q.category === selectedCategory);
    if (selectedDifficulty !== "Combined")
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    const num = Math.min(10, pool.length);
    const picked = shuffle(pool).slice(0, num);
    setQuestions(picked);
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setStreak(0);
    setMaxStreak(0);
    setSelected(null);
    setAnswered(false);
    setShowExplanation(false);
    setTimeLeft(20);
    setTimerActive(true);
    setMode("playing");
  }

  function handleAnswer(idx) {
    if (answered) return;
    clearTimeout(timerRef.current);
    setTimerActive(false);
    setSelected(idx);
    setAnswered(true);
    const q = questions[current];
    const correct = idx === q.answer;
    const newScore = correct ? score + 1 : score;
    const newStreak = correct ? streak + 1 : 0;
    const newMaxStreak = Math.max(maxStreak, newStreak);
    setScore(newScore);
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);
    setAnswers((prev) => [...prev, { question: q, selected: idx, correct }]);
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      setMode("result");
      setTimerActive(false);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
      setTimeLeft(20);
      setTimerActive(true);
    }
  }

  function restart() {
    setMode("menu");
  }

  const q = questions[current];
  const progress = questions.length
    ? ((current + (answered ? 1 : 0)) / questions.length) * 100
    : 0;

  const getScoreLabel = () => {
    const pct = score / questions.length;
    if (pct === 1) return { label: "Perfect Score! 🏆", color: "#22C55E" };
    if (pct >= 0.8) return { label: "Excellent! 🌟", color: "#4ADE80" };
    if (pct >= 0.6) return { label: "Good Work! ⚽", color: "#FCD34D" };
    if (pct >= 0.4) return { label: "Keep Practicing!", color: "#F97316" };
    return { label: "Try Again!", color: "#F87171" };
  };

  /* ─── MENU ─── */
  if (mode === "menu") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          padding: "40px 16px",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(22,163,74,0.1)",
                border: "1px solid rgba(22,163,74,0.25)",
                borderRadius: 40,
                padding: "6px 16px",
                marginBottom: 20,
              }}
            >
              <Zap size={11} color="#22C55E" />
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#22C55E",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                World Cup Quiz
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Barlow Condensed','Hind Siliguri',sans-serif",
                fontSize: "clamp(2.2rem,6vw,3.5rem)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              Test Your Football
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#22C55E,#4ADE80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Knowledge
              </span>
            </h1>
            <p
              style={{
                color: "#64748B",
                fontSize: "0.9rem",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              {ALL_QUESTIONS.length} questions across History, Records, Players,
              Venues & the 2026 Edition. Can you get a perfect score?
            </p>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {[
              {
                icon: Brain,
                label: "Questions",
                value: ALL_QUESTIONS.length,
                color: "#22C55E",
              },
              { icon: Shield, label: "Categories", value: 5, color: "#60A5FA" },
              { icon: Clock, label: "Sec / Q", value: 20, color: "#EAB308" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "18px 12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${color}1a`,
                      border: `1px solid ${color}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={16} color={color} />
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#CBD5E1",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 18,
              }}
            >
              Customize Your Quiz
            </h3>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 8,
                }}
              >
                Category
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 30,
                      border:
                        selectedCategory === cat
                          ? "1px solid rgba(22,163,74,0.5)"
                          : "1px solid rgba(255,255,255,0.08)",
                      background:
                        selectedCategory === cat
                          ? "rgba(22,163,74,0.15)"
                          : "transparent",
                      color: selectedCategory === cat ? "#22C55E" : "#64748B",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 8,
                }}
              >
                Difficulty
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {difficulties.map((diff) => {
                  const dc =
                    diff !== "Combined" ? DIFFICULTY_COLORS[diff] : null;
                  const active = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: 30,
                        border: active
                          ? `1px solid ${dc ? dc.text + "66" : "rgba(22,163,74,0.5)"}`
                          : "1px solid rgba(255,255,255,0.08)",
                        background: active
                          ? dc
                            ? dc.bg
                            : "rgba(22,163,74,0.15)"
                          : "transparent",
                        color: active ? (dc ? dc.text : "#22C55E") : "#64748B",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg,#15803D,#16A34A)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: "'Barlow Condensed',sans-serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 8px 32px rgba(22,163,74,0.3)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Trophy size={18} /> Start Quiz <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  /* ─── PLAYING ─── */
  if (mode === "playing" && q) {
    const catStyle = CATEGORY_COLORS[q.category] || CATEGORY_COLORS["History"];
    const diffStyle =
      DIFFICULTY_COLORS[q.difficulty] || DIFFICULTY_COLORS["Medium"];
    const timerPct = (timeLeft / 20) * 100;
    const timerColor =
      timeLeft > 10 ? "#22C55E" : timeLeft > 5 ? "#EAB308" : "#EF4444";

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          padding: "32px 16px",
        }}
      >
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#22C55E",
                }}
              >
                Q {current + 1} / {questions.length}
              </span>
              {streak >= 2 && (
                <span
                  style={{
                    background: "rgba(234,179,8,0.15)",
                    border: "1px solid rgba(234,179,8,0.3)",
                    color: "#EAB308",
                    borderRadius: 30,
                    padding: "2px 10px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                  }}
                >
                  🔥 {streak} Streak
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background:
                  timeLeft <= 5
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(22,163,74,0.08)",
                border: `1px solid ${timerColor}33`,
                borderRadius: 30,
                padding: "4px 14px",
              }}
            >
              <Clock size={12} color={timerColor} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: timerColor,
                  minWidth: 18,
                  textAlign: "center",
                }}
              >
                {timeLeft}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 4,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 4,
              marginBottom: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg,#15803D,#22C55E)",
                borderRadius: 4,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Timer bar */}
          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 3,
              marginBottom: 28,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${timerPct}%`,
                background: timerColor,
                borderRadius: 3,
                transition: "width 1s linear, background 0.5s",
              }}
            />
          </div>

          {/* Question card */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "28px 24px",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  background: catStyle.bg,
                  border: `1px solid ${catStyle.border}`,
                  color: catStyle.text,
                  borderRadius: 30,
                  padding: "3px 10px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {q.category}
              </span>
              <span
                style={{
                  background: diffStyle.bg,
                  color: diffStyle.text,
                  borderRadius: 30,
                  padding: "3px 10px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                }}
              >
                {q.difficulty}
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Barlow Condensed','Hind Siliguri',sans-serif",
                fontSize: "clamp(1.1rem,3vw,1.4rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: "grid", gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = "var(--card)",
                border = "rgba(255,255,255,0.07)",
                color = "#CBD5E1",
                icon = null;
              if (answered) {
                if (i === q.answer) {
                  bg = "rgba(22,163,74,0.15)";
                  border = "rgba(22,163,74,0.5)";
                  color = "#4ADE80";
                  icon = <CheckCircle size={18} color="#22C55E" />;
                } else if (i === selected && i !== q.answer) {
                  bg = "rgba(239,68,68,0.12)";
                  border = "rgba(239,68,68,0.4)";
                  color = "#F87171";
                  icon = <XCircle size={18} color="#EF4444" />;
                } else {
                  color = "#334155";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    color,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: answered ? "default" : "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!answered)
                      e.currentTarget.style.borderColor = "rgba(22,163,74,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    if (!answered)
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#64748B",
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {icon && <span style={{ flexShrink: 0 }}>{icon}</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation + Next */}
          {answered && (
            <div style={{ marginTop: 20 }}>
              {showExplanation ? (
                <div
                  style={{
                    background: "rgba(22,163,74,0.06)",
                    border: "1px solid rgba(22,163,74,0.2)",
                    borderRadius: 12,
                    padding: "14px 16px",
                    marginBottom: 14,
                  }}
                >
                  <p
                    style={{
                      color: "#86EFAC",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    💡 {q.explanation}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setShowExplanation(true)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(22,163,74,0.2)",
                    borderRadius: 10,
                    color: "#22C55E",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "8px 16px",
                    marginBottom: 14,
                  }}
                >
                  See Explanation
                </button>
              )}
              <button
                onClick={nextQuestion}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg,#15803D,#16A34A)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  fontFamily: "'Barlow Condensed',sans-serif",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 4px 20px rgba(22,163,74,0.25)",
                }}
              >
                {current + 1 >= questions.length
                  ? "See Results"
                  : "Next Question"}{" "}
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── RESULT ─── */
  if (mode === "result") {
    const { label, color } = getScoreLabel();
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          padding: "40px 16px",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div
            style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24,
              padding: "36px 28px",
              textAlign: "center",
              marginBottom: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg,transparent,${color},transparent)`,
              }}
            />
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: `${color}1a`,
                border: `2px solid ${color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Trophy size={30} color={color} />
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "clamp(1.8rem,5vw,2.6rem)",
                fontWeight: 900,
                color,
                marginBottom: 6,
              }}
            >
              {label}
            </h2>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "clamp(3rem,8vw,5rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {score}
              <span style={{ color: "#334155" }}>/{questions.length}</span>
            </div>
            <div
              style={{ color: "#64748B", fontSize: "0.85rem", marginTop: 4 }}
            >
              {pct}% correct
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 12,
                marginTop: 24,
              }}
            >
              {[
                { label: "Correct", value: score, color: "#22C55E" },
                {
                  label: "Wrong",
                  value: questions.length - score,
                  color: "#F87171",
                },
                { label: "Best Streak", value: maxStreak, color: "#EAB308" },
              ].map(({ label, value, color: c }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 12,
                    padding: "14px 8px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: c,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#475569",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer review */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: "20px 20px",
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#CBD5E1",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 16,
              }}
            >
              Answer Review
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {answers.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    background: a.correct
                      ? "rgba(22,163,74,0.06)"
                      : "rgba(239,68,68,0.05)",
                    border: `1px solid ${a.correct ? "rgba(22,163,74,0.2)" : "rgba(239,68,68,0.15)"}`,
                    borderRadius: 12,
                  }}
                >
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    {a.correct ? (
                      <CheckCircle size={16} color="#22C55E" />
                    ) : (
                      <XCircle size={16} color="#EF4444" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#CBD5E1",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      {a.question.question}
                    </div>
                    {!a.correct && (
                      <div style={{ fontSize: "0.72rem", color: "#22C55E" }}>
                        ✓ {a.question.options[a.question.answer]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <button
              onClick={restart}
              style={{
                padding: "14px 20px",
                borderRadius: 14,
                border: "1px solid rgba(22,163,74,0.3)",
                background: "transparent",
                color: "#22C55E",
                fontSize: "0.9rem",
                fontWeight: 700,
                fontFamily: "'Barlow Condensed',sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <RotateCcw size={15} /> Back to Menu
            </button>
            <button
              onClick={startQuiz}
              style={{
                padding: "14px 20px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg,#15803D,#16A34A)",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 700,
                fontFamily: "'Barlow Condensed',sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 20px rgba(22,163,74,0.25)",
              }}
            >
              <RotateCcw size={15} /> Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
