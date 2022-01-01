//COPY FILES TO ALL KNOWN SERVERS
//This script copy a script(s) to a host server, it hacks the server if you don't have access to it, it reads how many threads the server has and execute
//your script accordingly
files = ["scriptprincipal.script"];

serverlist = ["darkweb", "iron-gym", "harakiri-sushi", "hong-fang-tea", "max-hardware", "omega-net", "avmnite-02h", "phantasy", "neo-net", "johnson-ortho", "catalyst", "aevum-police", "alpha-ent", "aerocorp", "netlink", "I.I.I.I", "zb-institute", "the-hub", "joesguns", "zer0", "sigma-cosmetics", "foodnstuff", "CSEC", "n00dles", "nectar-net", "silver-helix", "crush-fitness", "rothman-uni", "rho-construction", "snap-fitness", "deltaone", "zeus-med", "nova-med", "microdyne", "stormtech", "omnitek", "clarkinc", "megacorp", "nwo", "fulcrumassets", "ecorp", "titan-labs", "vitalife", "4sigma", "powerhouse-fitness", "The-Cave", "b-and-a", "infocomm", "applied-energetics", "helios", "kuai-gong", "blade", "univ-energy", "icarus", "taiyang-digital", "run4theh111z", "fulcrumtech", ".", "defcomm", "zb-def", "global-pharm", "unitalife", "comptek", "syscore", "lexo-corp", "galactic-cyber", "omnia", "solaris", "summit-uni", "millenium-fitness"
];

var length = serverlist.length;

var i;
for (i = 0; i < length; i = i + 1) {
	tprint("\nWorking on server: " + serverlist[i]);
	scp(files, "home", serverlist[i]);
	if (getServerRequiredHackingLevel(serverlist[i]) > getHackingLevel()) {
		tprint("You don't have enough level to hack this server.");
		continue;
	}
	//HACKING
	tprint("\nTest and hacking server: " + serverlist[i]);
	if (!hasRootAccess(serverlist[i])) {
		brutessh(serverlist[i]);
		ftpcrack(serverlist[i]);
		relaysmtp(serverlist[i]);
		httpworm(serverlist[i]);
		sqlinject(serverlist[i]);
		nuke(serverlist[i]);

	}

	//THREADS TO RUN SCRIPT
	var server_ram = getServerRam(serverlist[i])[0];
	tprint(server_ram);
	var script_ram = getScriptRam("scriptprincipal.script", "home");
	tprint(script_ram);
	var threads = Math.floor(server_ram / script_ram);
	tprint(threads);
	if (threads < 1) {
		tprint("PC DA XUXA, IGNORA ESTA MERDA");
		continue;
	}

	//EXECUTE SCRIPT
	print("\nKilling and Executing Script on: " + serverlist[i]);
	killall(serverlist[i]);
	exec("scriptprincipal.script", serverlist[i], threads);
}
