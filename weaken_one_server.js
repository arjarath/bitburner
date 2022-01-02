// Gets this levels of servers
var server = args[0];

// Check Root Access
if (hasRootAccess(server)) {

	var min_sec = getServerMinSecurityLevel(server);
	var actual_sec_level = getServerSecurityLevel(server);

	while (actual_sec_level > min_sec) {
		weaken(server);
		actual_sec_level = getServerSecurityLevel(server);
	}

}


