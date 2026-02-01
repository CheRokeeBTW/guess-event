import { DailyChallenge } from "../types";

 const events: DailyChallenge[][] = [
  [
  { image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/ENIAC-changing_a_tube_%28cropped%29.jpg", question: "When was the first pc invented?", answer: 1971 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bataille_de_Verdun_1916.jpg/250px-Bataille_de_Verdun_1916.jpg", question: "When did the World War I started?", answer: 1914 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/A_Man_on_the_Moon%2C_AS11-40-5903_%28cropped%29.jpg/330px-A_Man_on_the_Moon%2C_AS11-40-5903_%28cropped%29.jpg", question: "When was the first moon landing?", answer: 1969 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/West_and_East_Germans_at_the_Brandenburg_Gate_in_1989.jpg/330px-West_and_East_Germans_at_the_Brandenburg_Gate_in_1989.jpg", question: "When did the Berlin wall fall?", answer: 1989 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Youtube_interface%2C_showing_search_results_of_Burger_Recipe.png/330px-Youtube_interface%2C_showing_search_results_of_Burger_Recipe.png", question: "When was YouTube created?", answer: 2005 },
  ], //first day
    [
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Raising_a_flag_over_the_Reichstag_-_Restoration.jpg/250px-Raising_a_flag_over_the_Reichstag_-_Restoration.jpg", question: "When did the World War II ended", answer: 1945 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/RMS_Titanic_3_%28cropped_to_ship%29.jpg/330px-RMS_Titanic_3_%28cropped_to_ship%29.jpg", question: "When did the Titanic sink?", answer: 1912 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg/330px-RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg", question: "When did the Cold War officially end?", answer: 1991 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/19th_century_Coca-Cola_coupon.jpg/250px-19th_century_Coca-Cola_coupon.jpg", question: "When did Coca-Cola get invented?", answer: 1886 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/250px-LEGO_logo.svg.png", question: "When was LEGO founded?", answer: 1932 },
  ], //second day
      [
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Photographer_Photographing_Nevada_Mountains.jpg/330px-Photographer_Photographing_Nevada_Mountains.jpg", question: "When did humans first take a photo?", answer: 1826 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/250px-Flag_of_the_Soviet_Union.svg.png", question: "When was the Soviet Union dissolved?", answer: 1991 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Evolution_36_mail.png/250px-Evolution_36_mail.png", question: "When was the first email sent?", answer: 1971 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/330px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png", question: "When was DNA structure discovered?", answer: 1953 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Steam_%28service%29.png/250px-Steam_%28service%29.png", question: "When was Steam launched?", answer: 2003 },
  ], //3rd day
      [
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png", question: "When was Minecraft first released? (alpha release)", answer: 2009 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Grand_Theft_Auto_V.png/250px-Grand_Theft_Auto_V.png", question: "When was GTA V released?", answer: 2013 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/World_of_Warcraft.png/250px-World_of_Warcraft.png", question: "When was World of Warcraft released?", answer: 2004 },
  { image: "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png", question: "When was Super Mario Bros. released?", answer: 1985 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bethesda_Game_Studios_logo.svg/250px-Bethesda_Game_Studios_logo.svg.png", question: "When was Bethesda Softworks LLC founded", answer: 1986 },
  ], //4th day
      [
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Facebook_logo_%282023%29.svg/250px-Facebook_logo_%282023%29.svg.png", question: "When was Facebook launched?", answer: 2004 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/120px-Logo_of_Twitter.svg.png", question: "When was Twitter (X) launched?", answer: 2006 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/First_iPhone_Macworld_2007_DSCF1286.agr.jpg/250px-First_iPhone_Macworld_2007_DSCF1286.agr.jpg", question: "When was the first iPhone released?", answer: 2007 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/120px-Google_Chrome_icon_%28February_2022%29.svg.png", question: "When did Google launch?", answer: 1998 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/250px-Wikipedia-logo-v2.svg.png", question: "When did Wikipedia launch?", answer: 2001 },
  ], //5th day
      [
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Battle_of_Gettysburg%2C_by_Currier_and_Ives.png/330px-Battle_of_Gettysburg%2C_by_Currier_and_Ives.png", question: "When did the American Civil War begin?", answer: 1861 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Napoleon_Wagram.jpg/250px-Napoleon_Wagram.jpg", question: "When did Napoleon become Emperor of France?", answer: 1804 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/120px-OpenAI_logo_2025_%28symbol%29.svg.png", question: "When was ChatGPT released?", answer: 2022 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Google_maps_screenshot.png/330px-Google_maps_screenshot.png", question: "When was Google Maps launched?", answer: 2005 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Shrek_logo.svg/250px-Shrek_logo.svg.png", question: "When was Shrek released?", answer: 2001 },
  ], //6th day
      [
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/250px-Instagram_logo_2022.svg.png", question: "When was Instagram launched?", answer: 2010 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/250px-Bitcoin.svg.png", question: "When did Bitcoin launch?", answer: 2009 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Voting_United_States.jpg/250px-Voting_United_States.jpg", question: "When did women gain the right to vote in the US?", answer: 1920 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Flag_of_the_Ottoman_Empire_%281844%E2%80%931922%29.svg/250px-Flag_of_the_Ottoman_Empire_%281844%E2%80%931922%29.svg.png", question: "When did the Ottoman Empire officially end?", answer: 1922 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/%D0%9F%D0%B5%D1%80%D0%B2%D1%8B%D0%B9_%D0%B2_%D0%BC%D0%B8%D1%80%D0%B5_%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%81%D0%BF%D1%83%D1%82%D0%BD%D0%B8%D0%BA_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8.jpg/250px-%D0%9F%D0%B5%D1%80%D0%B2%D1%8B%D0%B9_%D0%B2_%D0%BC%D0%B8%D1%80%D0%B5_%D0%B8%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%81%D0%BF%D1%83%D1%82%D0%BD%D0%B8%D0%BA_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8.jpg", question: "When was the first artificial satellite (Sputnik) launched?", answer: 1957 },
  ], // day 7
      [
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/250px-QR_code_for_mobile_English_Wikipedia.svg.png", question: "When was the first QR code invented?", answer: 1994 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/FortniteLogo.svg/250px-FortniteLogo.svg.png", question: "When was Fortnite released?", answer: 2017 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/AmongUsWhiteKillBlue.png/250px-AmongUsWhiteKillBlue.png", question: "When was Among Us released?", answer: 2018 },
  { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/The_Matrix_%28franchise_logo%29.svg/330px-The_Matrix_%28franchise_logo%29.svg.png", question: "When was The Matrix released?", answer: 1999 },
  { image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Game_of_Thrones_title_card.jpg/250px-Game_of_Thrones_title_card.jpg", question: "When did Game of Thrones first air?", answer: 2011 },
  ], // day 8
];

export default events;