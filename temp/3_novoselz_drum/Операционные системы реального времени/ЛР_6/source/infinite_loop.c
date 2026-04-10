#include <stdio.h>
#include <signal.h>
#include <unistd.h>

int main() {
    printf("Process with PID %d is now running in an infinite loop.\n", getpid());
    printf("This process is designed for monitoring experiments.\n");
    
    while(1) {
        // Sleep for 10 seconds to minimize CPU impact
        sleep(10);
    }
    
    return 0;
}
