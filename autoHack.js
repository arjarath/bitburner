//COPY FILES TO ALL KNOWN SERVERS
//This script copy a script(s) to a host server, it hacks the server if you don't have access to it, it reads how many threads the server has and execute
//your script accordingly

function getThreads(host) {
	var server_ram = getServerRam(host)[0];
	var script_ram = getScriptRam(files, "home");
	var threads = Math.floor(server_ram / script_ram);
	tprint("Server RAM: " + server_ram + ". Threads: " + threads);
	return threads;
}

function getRootAccess(server) {
	var num_ports_acessible = 0;
	if (hasRootAccess(server)) {
		tprint("Already has root access.");
		return 1;
	}

	tprint("Don't have root access on " + server)
	if (fileExists('BruteSSH.exe')) {
		tprint("Running BruteSSH");
		brutessh(server);
		num_ports_acessible++;
	}
	if (fileExists('FTPCrack.exe')) {
		tprint("Running FTPCracker");
		ftpcrack(server);
		num_ports_acessible++;
	}

	if (fileExists('relaySMTP.exe')) {
		tprint("Running RelaySMTP");
		relaysmtp(server);
		num_ports_acessible++;
	}

	if (fileExists('HTTPWorm.exe')) {
		tprint("Running HTTPWorm");
		httpworm(server);
		num_ports_acessible++;
	}

	if (fileExists('SQLInject.exe')) {
		tprint("Running SQLInject");
		sqlinject(server);
		num_ports_acessible++;
	}

	if (getServerNumPortsRequired(server) <= num_ports_acessible) {
		tprint("NUKE!");
		nuke(server);
		return 1;
	} else {
		tprint("Not enough open ports. Needs " + getServerNumPortsRequired(server));
		return 0;
	}

}

function hackOneServer(server) {

	// 1
	tprint("Getting root access");
	while (!getRootAccess(server)) {
		sleep();
	}

	// 2
	tprint("Copying files");
	scp(files, "home", server);

	// 3
	tprint("Calculating threads");
	var threads = getThreads(server);
	if (threads < 1) {
		tprint("PC DA XUXA, IGNORA ESTA MERDA");
		return 0;
	}

	// 4
	print("Executing Script");
	killall(server);
	var pid = exec(files, server, threads);
	return pid;
}

files = "hack_simple.script";
var servers_hacked = 0;

// HACK FIRST TWO SERVERS
var pid;
tprint("Hacking n00dles");
pid = hackOneServer("n00dles");

tprint("Hacking foodnstuff");
pid = hackOneServer("foodnstuff");

servers_hacked = 2;
tprint("Hacked first 2 servers: n00dles and foodnstuff");


// LOOP ON OTHER SERVER TO HACK WHEN LEVEL IS REACHED
// LIST IS IN ORDER OF LEVEL
serverlist = ["sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi", "neo-net", "zer0", "max-hardware", "iron-gym", "phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub", "comptek", "netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction", "millenium-fitness", "aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm", "applied-energetics", "unitalife", "univ-energy", "nova-med", "zb-def", "zb-institute", "vitalife", "titan-labs", "solaris", "microdyne", "helios", "deltaone", "icarus", "zeud-med", "omnia", "defcomm", "galactic-cyber", "infocomm", "taiyang-digital", "stormtech", "aerocorp", "clarkeinc", "omnitek", "nwo", "4sigma", "blade", "b-and-a", "ecorp", "fulcrumtech", "megacorp", "kuai-gong", "fulcrumassets", "powerhouse-fitness"];
var length = serverlist.length;
var i;

for (i = 0; i < length; i = i + 1) {
	var working_server = serverlist[i];
	tprint("\n\nWorking on server: " + working_server);

	if (getServerRequiredHackingLevel(working_server) > getHackingLevel()) {
		tprint("Can't hack server " + working_server + ". Level required: " + getServerRequiredHackingLevel(working_server));
		tprint("Will check every 5 minutes");
	}
	// Wait untill level is reached
	while (getServerRequiredHackingLevel(working_server) > getHackingLevel()) {
		sleep(300);
	}

	tprint("==== We reached level to hack server " + working_server);

	var pid = hackOneServer(working_server);
	if (pid != 0) {
		servers_hacked++;
		tprint(servers_hacked + " servers hacked so far!");
	} else {
		tprint("Failed to hack server.");
	}
}
