var serverlist = ["darkweb", "iron-gym", "harakiri-sushi",
	"hong-fang-tea", "max-hardware", "omega-net", "avmnite-02h",
	"phantasy", "neo-net", "johnson-ortho", "catalyst", "aevum-police",
	"alpha-ent", "aerocorp", "netlink", "I.I.I.I", "zb-institute", "the-hub",
	"joesguns", "zer0", "sigma-cosmetics", "foodnstuff", "CSEC", "n00dles", "nectar-net",
	"silver-helix", "crush-fitness", "rothman-uni", "rho-construction", "snap-fitness",
	"deltaone", "zeus-med", "nova-med", "microdyne", "stormtech", "omnitek", "clarkinc",
	"megacorp", "nwo", "fulcrumassets", "ecorp", "titan-labs", "vitalife", "4sigma",
	"powerhouse-fitness", "The-Cave", "b-and-a", "infocomm", "applied-energetics",
	"helios", "kuai-gong", "blade", "univ-energy", "icarus", "taiyang-digital", "run4theh111z",
	"fulcrumtech", ".", "defcomm", "zb-def", "global-pharm", "unitalife", "comptek", "syscore",
	"lexo-corp", "galactic-cyber", "omnia", "solaris", "summit-uni", "millenium-fitness"
];

for (i = 0; i < serverlist.length; i = i + 1) {
	exec("grow_one_server.script", "home", 1, serverlist[i]);
}