export const LdC = {};

LdC.sexe = {
    aucun: "",
    feminin: "Feminin",
    masculin: "Masculin"
}

LdC.signes = {
    aucun: "",
    griffe: "LdC.griffe",
    souffle: "LdC.souffle",
    ecaille: "LdC.ecaille",
    sang: "LdC.sang"
}

LdC.competences = {
    aucun: "",
    athletisme: "LdC.athletisme",
    autorite: "LdC.autorite",
    bagarre: "LdC.bagarre",
    equitation: "LdC.equitation",
    volonte: "LdC.volonte",
    creation: "LdC.creation",
    debrouille: "LdC.debrouille",
    duperie: "LdC.duperie",
    furtivite: "LdC.furtivite",
    vigilance: "LdC.vigilance",
    intrigue: "LdC.intrigue",
    negoce: "LdC.negoce",
    persuasion: "LdC.persuasion", 
    seduction: "LdC.seduction",
    strategie: "LdC.strategie",
    erudition: "LdC.erudition",
    investigation: "LdC.investigation",
    medecine: "LdC.medecine",
    technique: "LdC.technique",
    tir: "LdC.tir",
    occultisme: "LdC.occultisme",
    escrime: "LdC.escrime"
}

LdC.ecole = {
    aucun: "",
    germanique : { 
        label : "Ecole germanique",
        signe : "griffe",
        desc: "L’escrime allemande est compilée dans les Festbücher, des traités écrits entre le xive et le xvie siècle. Ces techniques ont été les premières à voir le jour. C’est une escrime brutale, qui s’appuie sur l’art médiéval du combat. Un escrimeur de l’école germanique n’hésitera pas à se battre à mains nues, à cheval, avec une épée lourde, voire avec une armure. C’est l’escrime des soldats et des spadassins, même s’il reste prestigieux pour un bretteur de se déclarer de l’école de Liechtenauer et si les épées allemandes sont réputées.<p>Les bretteurs germaniques utilisent des épées longues, parmi lesquelles on trouve les pappenheimer chères au capitaine La Fargue, bien plus encombrantes et lourdes que la rapière ou le fleuret, et dont les lames sont aiguisées et tranchantes. Il leur arrive d’utiliser une main-gauche, une dague, ou des armes plus rudimentaires telles que des masses ou des haches."
    },
    drac : { 
        label : "Ecole drac",
        signe : "griffe",
        desc: "Les dracs sont des combattants-nés. Au fil des siècles, ils ont su se constituer un vaste savoir martial qui se transmet à la fois par la parole et par l’héritage génétique. Les humains ont ainsi plus de mal à en percer les mystères et à se l’approprier. Au xvie siècle, quelques rares bretteurs humains entreprirent de consigner certaines de ces techniques dans des manuels afin de diffuser le formidable potentiel de l’école drac auprès des fines lames du monde entier, mais les dracs s’y opposèrent farouchement, tuant tous ceux qui s’y risquaient. Ces ouvrages furent pour la plupart détruits ou perdus et restent aujourd’hui des légendes dans le monde des duellistes.<p>L’escrime drac est particulièrement brutale. Basée sur l’exploitation maximale de la puissance physique et de la souplesse du combattant, elle fut pensée pour renverser et tuer, vite et bien.<p>Elle permet à celui qui la pratique de s’investir totalement dans le combat, dans une sorte de transe bestiale qui atténue la douleur et la sensation de fatigue. La consommation de jusquiame améliore de façon significative les performances des pratiquants de cet art."
    },
    francaise : { 
        label : "Ecole française",
        signe : "souffle",
        desc: "En 1643, cette escrime naissante commence à trouver des adeptes. Elle se veut révolutionnaire par rapport à l’escrime italienne. On y pratique volontiers des manœuvres de saisie, considérées comme vulgaires par les maîtres italiens.<p>Dans cette école, on se bat au fleuret. Comme cette arme n’a pas de tranchant, le coup de taille n’existe pas. De plus, les déplacements s’effectuent en ligne, faisant du Français un moins bon défenseur. Par contre, ses adeptes maîtrisent l’art de la fente ou stoccata lunga, une pratique moderne et efficace. Toute la technique consiste à placer une attaque en force, rapide et brutale, aussi allongée que possible, en projetant son corps en avant. Ce sont donc de redoutables attaquants.<p>Ils sont également férus de la «botte en passant» qui consiste à frapper son adversaire tout en marchant afin d’appuyer son coup non seulement avec le bras, mais également avec les jambes. Les escrimeurs français sont ainsi connus pour leur style violent et sobre. Ils économisent leurs mouvements pour frapper au plus juste, au plus fort, et gèrent leur dépense d’énergie."
    },
    pirate : { 
        label : "Ecole pirate",
        signe : "souffle",
        desc: "Cette escrime est utilisée par les marins, corsaires, flibustiers, boucaniers, forbans et filous de tout poil. Si les rapières n’en sont pas exclues, elle se pratique surtout avec un sabre d’abordage, une arme à lame courte, épaisse et courbe, plutôt lourde et très tranchante. Les canailles des océans prisent cette arme pour son efficacité à couper les chairs, mais aussi les cordages, voire le fromage et la viande séchée.<p>Ici, on ne parle plus d’art, mais de pratiques et techniques plus ou moins instinctives. Aucun manuel n’en explique les règles – on l’apprend sur le tas, à la dure. Particulièrement acrobatique, elle s’enseigne dans les cordages des bateaux ou dans les auberges mal famées des ports, une bouteille de rhum à la main. Ceux qui la pratiquent se fient à leur équilibre, leurs réflexes, leur imagination plutôt qu’à des gestes codifiés et maîtrisés.<p>La vantardise, la fourberie, la cruauté et la témérité sont les ingrédients principaux de sa réussite. La fin justifie les moyens des bretteurs de cette école, qui ne reculent devant rien pour vaincre leur adversaire. Bien entendu, cette forme d’escrime est particulièrement méprisée par les adeptes des écoles dites « nobles »."
    },
    italienne : { 
        label : "Ecole italienne",
        signe : "sang",
        desc: "C’est l’école dont le style est le plus varié. Adeptes à la fois des passements (coups portés en marchant) et des bottes portées de pied ferme (sur une position stable), les épéistes italiens alternent les coups d’estoc efficaces et les voltes artistiques. Leur style est dynamique, vif et très reconnaissable. Il implique une débauche d’énergie qui produit une escrime très sportive dont le raffinement ravit les yeux. Les duellistes italiens dansent autour de leur adversaire, rendant leurs défenses plus difficiles à percer. Cette escrime très conservatrice est souvent mise en concurrence avec l’escrime française, qui se veut progressiste.<p>Les Italiens favorisent l’épée ou la rapière et se battent très souvent avec une main-gauche, un accessoire que les autres escrimeurs abandonnent volontiers."
    },
    suedoise : { 
        label : "Ecole suédoise",
        signe : "sang",
        desc: "Cette école fût fondée grâce à la connivence entre certains maîtres d’armes suédois et des dragons. La maîtrise des arcanes n’y est donc pas étrangère. De plus en plus de dragons et de sang-mêlé la pratiquent. Certains humains, dont le destin est particulièrement béni par les dragons, parviennent également à en comprendre les mystères, au prix d’un entraînement acharné. Le principe, pour le bretteur, est de puiser dans la force vive de son propre sang pour accroître certaines de ses capacités : sa perception, son agilité, sa force, etc. Le combattant s’engage dans une danse hypnotique dont l’extrême raffinement ravit l’œil du spectateur. Il fait appel aux forces draconiques qui tissent la réalité pour faire ployer la chance à son avantage."
    },
    espagnole : { 
        label : "Ecole espagnole",
        signe : "ecaille",
        desc: "C’est Jerónimo de Carranza qui a codifié les principales règles de cette escrime fondée sur le cercle magique, selon les règles de la géométrie grecque, qui ont valu à ces techniques le nom d’« escrime euclidienne». Ce cercle est à la fois celui de la lame qui tournoie et celui du bretteur qui circule autour de son adversaire. Pour être un bon escrimeur, il faut posséder, selon Carranza et son disciple Narvaez, la Verdadera Destreza, ou l’art de la dextérité, qui s’appuie sur la logique et la raison. C’est une escrime grave, sérieuse, souvent considérée par ses détracteurs comme trop austère.<p>L’escrime espagnole se pratique à la rapière et préfère les mouvements du corps latéraux et circulaires, ce qui permet d’obtenir un avantage en termes de positionnement et de défense. Ses adeptes sont à la recherche de « la parade universelle », une technique susceptible de rendre l’escrimeur intouchable. Le désarmement est le but ultime de l’escrime espagnole, car cette école se veut «non violente», et le bon escrimeur préserve son adversaire de la mort. Sauf, bien sûr, lorsque sa propre vie est en jeu…"
    },
    anglaise : { 
        label : "Ecole anglaise",
        signe : "ecaille",
        desc: "L’escrime anglaise, moderne et novatrice, n’a été que très récemment formalisée. Henry VIII, féru d’escrime, a permis, au début du xvie siècle, la formation de la Company of Masters of the Science of Defence (la compagnie des maîtres de la science de la défense), dont le rôle était de réguler the Art of Defence ou fencing (l’art de la défense ou l’escrime). La formation de cette organisation a largement contribué à la création d’une école spécifique, avec ses propres codes. Celle-ci se pratique à la rapière, au bâton de combat ou à l’épée large, une particularité étonnante en Europe où l’on abandonne progressivement ce genre d’armes. Cette spécificité est due à l’obsession, chez les maîtres d’armes anglais, de savoir bien se défendre.<p>Les premiers ouvrages sur le sujet, peu nombreux, le prouvent largement. Le manuel Paradoxes of Defence de George Silver (1599) fait l’éloge de l’épée courte face à la rapière, dont il pensait qu’elle était responsable de la mort de nombreux gentlemen. Ses arguments portent notamment sur la faible défense que fournissent les armes modernes, jugées trop fragiles. En 1617, Joseph Swetnam rédige quant à lui le traité d’escrime The Schoole of the Noble and Worthy Science of Defence (l’école de la noble et méritante science de la défense). Il y décrit une série de positions de garde inédites, y fait l’éloge des feintes et y encourage à favoriser l’estoc. Il invite également à blesser son adversaire plutôt qu’à le tuer.<p>L’école anglaise a pour caractéristique d’être plus fortement liée à l’art militaire que les autres écoles. C’est une escrime de guerre, ce qui explique également que l’épée large y soit privilégiée. Les tactiques de groupe sont donc enseignées plus largement qu’ailleurs à ses bretteurs."
    },
    soudard : { 
        label : "Ecole soudard",
        signe : "griffe",
        desc: "Cette école n’en est pas une, en vérité. Elle rassemble les techniques plus ou moins élégantes utilisées lors des bagarres de taverne, dans la boue des champs de bataille, dans la fièvre des ports louches. Elle se signale par son absence des règles."
    }
}

LdC.categorie = {
    aucun: "",
    combattants: "Combattants",
    courtisans: "Courtisans",
    lettres : "Lettrés",
    roturiers : "Roturiers"
}