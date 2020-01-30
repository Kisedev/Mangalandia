console.log('Este script preenche com mongoose a sua db com alguns mangas, capitulos, autores e categorias  de teste. Conexao da db passada com argumento, por ex: mongodb+srv://mangadmin:mangasword@kisesp-ui1cx.gcp.mongodb.net/test?retryWrites=true&w=majority');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}

var async = require('async')
var Manga = require('./models/manga')
var Autor = require('./models/autor')
var Categoria = require('./models/categoria')
var MangaCap = require('./models/mangacap')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var autores = []
var categorias = []
var mangas = []
var mangacaps = []

function addAutor(primeiro_nome, sobrenome, nascimento, falecimento, cb) {
  autorinfo = { primeiro_nome, sobrenome }
  if (nascimento) autorinfo.nascimento = nascimento
  if (falecimento) autorinfo.falecimento = falecimento

  var autor = new Autor(autorinfo);

  autor.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('Novo Autor: ' + autor);
    autores.push(autor)
    cb(null, autor)
  });
}

function addCategoria(nome, descricao, classificacao, cb) {
  catinfo = { nome };
  if (descricao) catinfo.descricao = descricao;
  if (classificacao) catinfo.classificacao = classificacao;

  var categoria = new Categoria(catinfo);

  categoria.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Nova Categoria: ' + categoria);
    categorias.push(categoria)
    cb(null, categoria);
  });
}

function addManga(titulo, sumario, autor, categoria, cb) {

  var manga = new Manga({ titulo, sumario, autor, categoria });
  manga.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('Novo Mangá: ' + manga);
    mangas.push(manga)
    cb(null, manga)
  });
}


function addCapManga(manga, isbn, num, nome, data, cb) {
  mangacapinfo = {
    manga,
    isbn,
    num
  }
  if (data) mangacapinfo.lancamento = data;
  if (nome) mangacapinfo.nome = nome;

  var mangacap = new MangaCap(mangacapinfo);
  mangacap.save(function (err) {
    if (err) {
      console.log('ERRO ao adicionar capítulo: ' + mangacap);
      cb(err, null)
      return
    }
    console.log('Novo Capítulo: ' + mangacap);
    mangacaps.push(mangacap)
    cb(null, manga)
  });
}


function addCatAutores(cb) {
  async.series([
    function (callback) {
      addCategoria("Kodomo", "São os mangás voltados para o público infantil (kodomo significa, literalmente, criança). Geralmente trazem histórias cômicas recheadas de lições de moral e ensinamentos. Além de tramas simples, a arte não é exagerada e é bem infantilizada para manter a atenção de seus leitores. Anpanman, o doce de feijão herói, é um dos maiores expoentes do kodomo mangá.", 6, callback);
    },
    function (callback) {
      addCategoria("Shounen", "Eis o estilo de mangá que rompeu fronteiras e levou os quadrinhos japoneses mundo afora. O shounen é o gênero de mangá voltado para o público infanto-juvenil masculino. Revistas famosas como a Shounen Jump, Shounen Sunday, Shounen Magazine e a Shounen Champion proveram o surgimento de alguns dos maiores sucessos da História dos quadrinhos japoneses. Dragon Ball, Os Cavaleiros do Zodíaco, Samurai X, Yu Yu Hakusho, Inu-Yasha, Fullmetal Alchemist, Yu-Gi-Oh, Naruto, One Piece, Death Note, Kuroko no Basket, Slam Dunk, Bakuman, Negima, Another, To Love-Ru entre tantos outros são exemplos de sucesso dos shounens. Entre as principais características desse estilo estão as histórias sempre voltadas para aventura, comédia e esportes. O traço usado pelos autores, embora seja cartunesco, é detalhado, preciso, forte e atrativo.", 12, callback);
    },
    function (callback) {
      addCategoria("Shoujo", "Este é o estilo de mangá direcionado para o público infanto-juvenil feminino. Diferente do shounen, seu traço é leve e sua arte clara e menos poluída. As histórias apresentadas nas páginas de um mangá shoujo podem ter aventura e comédia, mas os romances – que podem ou não conter elementos fantásticos – sobressaem no gosto de suas leitoras. Sakura Card Captors, Sailor Moon, Nana, Merupuri, Fruits Basket, Candy Candy, Rosa de Versalhes, Glass Mask, Aoharaido e Orange estão entre os destaques do gênero.", 12, callback);
    },
    function (callback) {
      addCategoria("Hentai", "No Ocidente, incluindo o Brasil, os mangás de cunho erótico voltados para o público adulto ficaram conhecidos como hentai. No entanto, no Japão, esse estilo é conhecido como seijin. Acredita-se que esse gênero surgiu a partir de gravuras eróticas que datam do Período Edo (1600 – 1867). Os temas também são bem variados e para todos os gostos. Os estilos usados por seus mangakás são bem abrangentes: podem ir desde comédias até o terror – e todos com sexo envolvido. Entre os títulos mais famosos publicados no Brasil estão Love Junkies, Futari H e Angel (sob o título Japinhas Safadinhas).", 18, callback);
    },
    function (callback) {
      addCategoria("Ecchi", "Apesar de ter ficado estigmatizado fora do Japão como um estilo de mangá, o ecchi, na verdade, é um dos elementos usados em obras voltadas para meninos em sua maioria. É o chamado “fan service”. É aquela pitada de erotismo para apimentar alguma história ou criar alguma situação cômica. Títulos como Freezing, Video Girl Ai, Love Hina, Ikkitousen, Tenjoh Tenge, Highschool of the Dead, Highschool DxD e Queen’s Blade são exemplares famosos por usarem – e abusarem – desse elemento em suas histórias.", 16, callback);
    },
    function (callback) {
      addAutor('Masashi', 'Kishimoto', '1974-11-08', false, callback);
    },
    function (callback) {
      addAutor('Tite', 'Kubo', '1977-06-26', false, callback);
    },
    function (callback) {
      addAutor('Hajime', 'Isayama', '1976-08-29', false, callback);
    },
    function (callback) {
      addAutor('Nakaba', 'Suzuki', '1977-02-08', false, callback);
    },
    function (callback) {
      addAutor('Ichiei', 'Ishibumi', '1981-04-25', false, callback);
    }
  ],
    // optional callback
    cb);
}

function addMangas(cb) {
  async.parallel([
    function (callback) {
      addManga
        ('Naruto', "Naruto Uzumaki é um menino que vive em Konohagakure no Sato ou simplesmente Konoha ou Vila Oculta da Folha, a vila ninja do País do Fogo. Quando ainda bebê, Naruto teve aprisionada em seu corpo a Kyuubi no Youko por Minato Namikaze (quarto Hokage, e seu pai), com a finalidade de salvar a Vila da Folha. Desde então, Naruto é visto por muitas pessoas como um monstro, não só pelos familiares das pessoas mortas pela Kyuubi, mas também por pessoas que não toleram suas brincadeiras, já que o mesmo é extremamente hiperativo, incompreendido e solitário. Naruto sonha em se tornar o Hokage de sua vila, um ninja poderoso e respeitado, para assim poder ser reconhecido por todos.", autores[0], [categorias[1]], callback);
    },
    function (callback) {
      addManga
        ('Bleach', "A história conta com Kurosaki Ichigo como personagem principal. Após uma série de incidentes ele acaba se tornando um Shinigami, que são responsáveis pelo fluxo de almas do mundo real até a Soul Society, assim como combater os espíritos malígnos, Hollows. Porém, conforme ele começa a se envolver com o mundo espiritual, ele acaba no meio de uma trama que ameaça a existência de ambos os mundos.", autores[1], [categorias[1]], callback);
    },
    function (callback) {
      addManga
        ('Shingeki no Kyojin', "Várias centenas de anos atrás, os humanos quase foram exterminados por Titãs. Os Titãs têm vários andares de altura, parecem não ter inteligência, devoram seres humanos e, o pior de tudo, parecem fazer isso pelo prazer e não como fonte de alimento.Avancemos para o presente e a cidade não viu um Titã há mais de 100 anos. O adolescente Eren e sua irmã adotiva Mikasa testemunham algo terrível quando as muralhas da cidade são destruídas por um super Titã que surge de lugar nenhum. Enquanto os Titãs menores inundam a cidade, as duas crianças assistem horrorizadas sua mãe ser devorada viva!", autores[2], [categorias[1]], callback);
    },
    function (callback) {
      addManga
        ('Nanatsu no Taizai', 'Os "Sete Pecados Capitais", um grupo maligno de cavaleiros que conspiraram para derrubar o reino de Britânia, supostamente foram erradicados pelos Cavaleiros Divinos, embora ainda existam rumores de que eles estão vivos. Dez anos depois, os Cavaleiros Divinos realizaram um golpe de estado e assassinaram o rei, se tornando os novos e tiranos governantes do reino. Elizabeth, a única filha do rei, sai em uma jornada para encontrar os "Sete Pecados Capitais", e recrutá-los para que possam ajudar a tomar o reino de volta!!!', autores[3], [categorias[1]], callback);
    },
    function (callback) {
      addManga
        ('High School DxD', 'O mangá conta a história de Hyoudou Issei, um estudante pervertido do 2º ano do ensino médio que foi assassinado por sua primeira namorada em um encontro. Issei é reencarnado como um demônio e, a partir daquele dia, ele serve como subordinado de Riasu, uma poderosa demônio que também é a garota mais bonita do colégio de Issei.', autores[4], [categorias[4], categorias[1]], callback);
    },
    function (callback) {
      addManga
        ('Test manga 1', 'Summary of test manga 1', autores[4], [categorias[0], categorias[3]], callback)
    },
    function (callback) {
      addManga
        ('Test manga 2', 'Summary of test manga 2', autores[2], [categorias[2], categorias[3], categorias[0], categorias[4]], callback)
    }
  ],
    // optional callback
    cb);
}


function addCapsManga(cb) {
  async.parallel([
    function (callback) {
      addCapManga(mangas[4], '978-4-04-712733-3', 1, 'I Quit Being Human.', '2011-06-07', callback)
    },
    function (callback) {
      addCapManga(mangas[4], '978-4-04-712733-3', 2, false, '2011-06-07', callback)
    },
    function (callback) {
      addCapManga(mangas[4], '978-4-04-712733-3', 3, "I've Begun a Battle.", false, callback)
    },
    function (callback) {
      addCapManga(mangas[1], '978-4-08-873213-8', 1, "Morte & Morango", '2002-01-05', callback)
    },
    function (callback) {
      addCapManga(mangas[1], '978-4-08-873213-8', 3, "Iniciante", false, callback)
    },
    function (callback) {
      addCapManga(mangas[2], '978-4-06-384276-0', 1, "Para Você, Após Dois Mil Anos", '2010-03-17', callback)
    },
    function (callback) {
      addCapManga(mangas[2], '978-4-08-873213-8', 3, "A Noite da Graduação", false, callback)
    },
    function (callback) {
      addCapManga(mangas[2], '978-4-06-384469-6', 17, "Força Ilusória", false, callback)
    },
    function (callback) {
      addCapManga(mangas[3], '978-4-06-384802-1', 17, "Os Sete Pecados Capitais", '2013-02-15', callback)
    }
  ],
    // Optional callback
    cb);
}



async.series([
  addCatAutores,
  addMangas,
  addCapsManga
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('mangacaps: ' + mangacaps);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });



