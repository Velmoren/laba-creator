import glob
import sys

def main():
    files_to_check = glob.glob("src/*/Методы оптимизации/*/source/prompt*.txt")
    
    if not files_to_check:
        print("No prompt files found to validate.")
        sys.exit(0)
        
    print(f"Found {len(files_to_check)} prompt files to validate.\n")
    
    all_valid = True
    for file in files_to_check:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        char_count = len(content)
        if char_count < 500:
            print(f"  [ERROR] {file} is too short! ({char_count} chars < 500 required)")
            all_valid = False
        else:
            print(f"  [OK] {file} is valid ({char_count} chars).")
            
    if all_valid:
        print("\n✅ All prompt files passed validation successfully!")
        sys.exit(0)
    else:
        print("\n❌ One or more prompt files failed validation.")
        sys.exit(1)

if __name__ == "__main__":
    main()
