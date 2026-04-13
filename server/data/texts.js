const typingTexts = [

  // Original facts retained
  "The speed of light in a vacuum is approximately 299,792 kilometers per second. This means that light from the Sun takes about eight minutes and twenty seconds to reach Earth. Despite this incredible speed, light from the nearest star outside our solar system, Proxima Centauri, takes over four years to arrive.",
  "Honey is one of the few foods that never spoils. Archaeologists discovered pots of honey in ancient Egyptian tombs over three thousand years old that were still perfectly edible. This remarkable preservation is due to honey's low moisture content, acidic pH, and natural hydrogen peroxide content.",
  "The human brain contains approximately 86 billion neurons, each connected to thousands of others through synapses. These connections form a network more complex than any computer ever built. Every thought, memory, and feeling you experience is the result of electrical signals racing through this extraordinary biological machine.",
  "Octopuses are among the most intelligent creatures in the ocean. They have three hearts, blue blood, and nine brains — one central brain and one in each of their eight arms. Each arm can act semi-independently, solving problems and reacting to the environment without waiting for instructions from the central brain.",
  "The Great Wall of China stretches over 21,000 kilometers across northern China. Contrary to popular belief, it is not visible from space with the naked eye. Construction began as early as the seventh century BC, with the most well-known sections built during the Ming Dynasty between 1368 and 1644.",
  "Lightning is a massive electrostatic discharge between electrically charged regions of clouds or between a cloud and the ground. A single bolt of lightning can reach temperatures of around 30,000 Kelvin — five times hotter than the surface of the Sun. Despite its power, a lightning bolt is only about 2.5 centimeters wide.",
  "The Amazon rainforest produces about 20 percent of the world's oxygen and is home to more than three million species of plants and animals. It spans across nine countries in South America and covers an area of approximately 5.5 million square kilometers, making it the largest tropical rainforest on Earth.",
  "Chess is one of the oldest strategy games in the world, originating in India around the sixth century AD before spreading to Persia and then Europe. The number of possible unique chess games is greater than the number of atoms in the observable universe, making it virtually impossible to master completely.",
  "The International Space Station orbits Earth at an average altitude of 408 kilometers, traveling at approximately 27,600 kilometers per hour. Astronauts aboard the station witness 16 sunrises and sunsets every single day. It has been continuously inhabited since November 2000, serving as a laboratory for scientific research.",
  "Mount Everest is the tallest mountain on Earth measured from sea level, standing at 8849 meters. However, if measured from the center of the Earth, Mount Chimborazo in Ecuador actually surpasses Everest due to the equatorial bulge of the planet. Thousands of climbers have attempted to summit Everest since Edmund Hillary and Tenzing Norgay first reached the top in 1953.",
  "The human heart beats approximately 100,000 times per day, pumping around 7500 liters of blood through a network of blood vessels that, if stretched end to end, would circle the Earth more than twice. Over an average lifetime, the heart beats more than two and a half billion times without ever taking a break.",
  "Black holes are regions of spacetime where gravity is so strong that nothing, not even light or other electromagnetic waves, has enough speed to escape the event horizon. The first direct image of a black hole was captured in 2019 by the Event Horizon Telescope collaboration, showing the supermassive black hole at the center of galaxy M87.",
  "The invention of the internet has fundamentally transformed how humans communicate, learn, and do business. What began as a United States military project called ARPANET in the 1960s has grown into a global network connecting billions of devices. Today more than five billion people use the internet, accessing information at speeds that would have seemed impossible just decades ago.",
  "Dolphins are highly social and intelligent marine mammals known for their complex communication systems. They use a series of clicks, whistles and body movements to communicate with each other. Research has shown that dolphins can recognize themselves in mirrors, use tools, and even call each other by unique signature whistles that function similarly to names.",
  "The periodic table of elements organizes all known chemical elements by their atomic number, electron configuration and recurring chemical properties. First proposed by Russian chemist Dmitri Mendeleev in 1869, the table has grown from 63 known elements to 118 today. Elements heavier than uranium are synthetic and do not occur naturally on Earth.",

  // Video Games
  "Minecraft has sold over 300 million copies as of 2025, making it the best selling video game of all time by a very wide margin. It has been officially ported to more than 20 different hardware platforms.",
  "The famous Konami Code was created by a developer who thought the original Gradius was much too hard. He added the cheat code for his own use during testing and completely forgot to remove it before release.",
  "Half-Life 2 does not contain a single cutscene that ever takes control away from the player. At every point during the entire game you retain full control of Gordon Freeman's head and movement.",
  "During the development of Portal, Valve did not tell their own management that they were making a full game. The team pretended it was just a small side project tech demo until it was almost complete.",
  "Super Mario 64 was the first 3D game to feature a fully controllable analog camera. The development team spent more time working on the camera than they did on Mario himself.",
  "Tetris was the first piece of entertainment software ever exported from the Soviet Union to the west. For almost a decade nobody involved in its creation received any royalties for the game.",
  "The entire original Doom executable was less than 2 megabytes in size. It could fit entirely inside the memory of a budget graphics card from the year 2000 with room left over.",

  // History
  "Cleopatra lived closer in time to the invention of the iPhone than she did to the construction of the Great Pyramid of Giza.",
  "The shortest war in recorded history lasted 38 minutes. It was fought between the United Kingdom and Zanzibar on the 27th of August 1896.",
  "For approximately 300 years it was standard practice in European libraries to chain books to the shelves. Books were so rare and expensive that they were considered more valuable than most people's houses.",
  "Napoleon was not actually short. He was slightly above average height for a French man of his time. The myth originated from a difference between French and British measurement units.",
  "When the first pyramids were being built there were still woolly mammoths alive in the far north of Siberia.",
  "Oxford University is older than the Aztec Empire. Teaching began at Oxford in 1096, while the city of Tenochtitlan was founded in 1325.",

  // Music
  "Freddie Mercury had a four octave vocal range, despite never having any formal vocal training. Most professional singers have a range of approximately two octaves.",
  "The most covered song in history is Yesterday by The Beatles. It has been officially recorded over 2200 times by different artists.",
  "The longest continuous performance of a single piece of music is scheduled to end in the year 2640. The composition by John Cage is being played inside a church in Germany, and one chord change happens every several years.",
  "Mozart wrote the melody for Twinkle Twinkle Little Star when he was five years old.",
  "Until 1998 the global music industry believed that no one would ever buy an album over the internet. Napster gained 80 million registered users in less than two years and proved them completely wrong.",

  // Science & Nature
  "You can reliably hear the difference between hot and cold water being poured. Over 96% of people can correctly identify the temperature of water just by the sound it makes.",
  "If you could fold a standard piece of paper 42 times it would reach the Moon. If you could fold it 103 times it would be larger than the entire observable universe.",
  "Bananas are botanically classified as berries, but strawberries are not.",
  "Humans share approximately 50 percent of their DNA with bananas.",
  "A day on Venus is longer than a year on Venus. The planet rotates on its axis so slowly that it completes an entire orbit around the Sun before it completes one full rotation.",
  "Sharks are older than trees. They have existed as a species for over 400 million years, while trees first evolved approximately 350 million years ago.",
  "Atoms are 99.9999999999999 percent empty space. Every solid object you have ever touched is almost entirely nothing.",
  "The weight of all the ants on Earth is approximately equal to the weight of all the humans on Earth.",

  // Technology
  "Apollo 11 landed on the Moon with less computing power than a modern digital wristwatch. The entire guidance computer had 64 kilobytes of memory.",
  "There are more possible Wi-Fi passwords than there are stars in the Milky Way galaxy.",
  "The first ever website is still online at exactly the same address it was when it was launched in 1991.",
  "Over 90 percent of all the data that has ever been created by humans was created in the last ten years.",
  "The QWERTY keyboard layout was deliberately designed to be slow. It was created to stop typists from jamming the keys on early mechanical typewriters.",

  // Obscure & Fun Facts
  "A group of flamingos is called a flamboyance. A group of crows is called a murder. A group of piranhas is called a fever. A group of feral pigs is called a sounder.",
  "Every two minutes we take more photographs than the entire human race took during the entire 19th century.",
  "If everyone on Earth stood shoulder to shoulder the entire human population could fit inside the city limits of Los Angeles.",
  "You have never actually touched anything in your entire life. The electromagnetic repulsion between electrons means you always hover a tiny distance above every object.",
  "Vending machines kill more people every year than sharks.",
  "There are more trees on Earth than there are stars in the Milky Way galaxy.",
  "There are more possible arrangements of a standard 52 card deck than there are stars in the observable universe. If you shuffle a deck properly it is almost guaranteed that no one in history has ever held that exact order before.",
];

module.exports = typingTexts;