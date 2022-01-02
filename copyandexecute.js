//COPY FILES TO ALL KNOWN SERVERS
//This script copy a script(s) to a host server, it hacks the server if you don't have access to it, it reads how many threads the server has and execute
//your script accordingly
files = "hack_simple.script";

// LIST IS IN ORDER OF LEVEL
serverlist = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi", "neo-net", "zer0", "max-hardware", "iron-gym", "phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub", "comptek", "netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction", "millenium-fitness", "aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm", "applied-energetics", "unitalife", "univ-energy", "nova-med", "zb-def", "zb-institute", "vitalife", "titan-labs", "solaris", "microdyne", "helios", "deltaone", "icarus", "zeud-med", "omnia", "defcomm", "galactic-cyber", "infocomm", "taiyang-digital", "stormtech", "aerocorp", "clarkeinc", "omnitek", "nwo", "4sigma", "blade", "b-and-a", "ecorp", "fulcrumtech", "megacorp", "kuai-gong", "fulcrumassets", "powerhouse-fitness"];
var length = serverlist.length;
var servers_hacked = [];

var i;
for (i = 0; i < length; i = i + 1) {
	tprint("\n\nWorking on server: " + serverlist[i]);
	scp(files, "home", serverlist[i]);
	if (getServerRequiredHackingLevel(serverlist[i]) > getHackingLevel()) {
		tprint("You don't have enough level to hack this server.");
		break;
	}

	//HACKING
	tprint("\nTest and hacking server: " + serverlist[i]);
	var num_ports_acessible = 0;
	var working_server = serverlist[i];
	if (!hasRootAccess(working_server)) {
		tprint("Don't have root access on " + working_server)
		if (fileExists('BruteSSH.exe')) {
			brutessh(working_server);
			num_ports_acessible++;
		}
		if (fileExists('FTPCrack.exe')) {
			ftpcrack(working_server);
			num_ports_acessible++;
		}

		if (fileExists('relaySMTP.exe')) {
			relaysmtp(working_server);
			num_ports_acessible++;
		}

		if (fileExists('HTTPWorm.exe')) {
			httpworm(working_server);
			num_ports_acessible++;
		}

		if (fileExists('SQLInject.exe')) {
			sqlinject(working_server);
			num_ports_acessible++;
		}

		if (getServerNumPortsRequired(working_server) <= num_ports_acessible)
			nuke(working_server);
	}


	//THREADS TO RUN SCRIPT
	var server_ram = getServerRam(serverlist[i])[0];
	tprint(server_ram);
	var script_ram = getScriptRam(files, "home");
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
	var pid = exec(files, serverlist[i], threads);

	if (pid != 0){
		servers_hacked++;
	}
}

tprint("# of servers hacked: " + servers_hacked);