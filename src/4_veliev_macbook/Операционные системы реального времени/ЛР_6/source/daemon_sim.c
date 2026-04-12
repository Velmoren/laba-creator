#include <stdio.h>
#include <unistd.h>
#include <time.h>

int main() {
    FILE *f = fopen("daemon.log", "a");
    if (f == NULL) return 1;
    fprintf(f, "Daemon started at %ld\n", (long)time(NULL));
    fclose(f);
    while(1) {
        sleep(10);
    }
    return 0;
}
