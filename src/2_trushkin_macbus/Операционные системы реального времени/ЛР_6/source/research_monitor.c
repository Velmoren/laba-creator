#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

/* OSRV Lab 6: Research Process Monitor */
/* Developed by: Trushkin (Senior Researcher) */
/* Purpose: Emulate background computational task for process life-cycle study */

int main() {
    pid_t pid = getpid();
    printf("Academic Research Process initialized. PID: %d\n", pid);
    printf("Starting background computational cycle...\n");
    
    while(1) {
        // Continuous loop to simulate CPU load for monitoring demonstration
        // Researcher can use 'top' or 'ps' to observe this process.
    }
    
    return 0;
}
