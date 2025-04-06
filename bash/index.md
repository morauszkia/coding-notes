---
title: Introduction to the shell
---

This section of my notes will deal with the shell (mostly bash).

## Terminal / console / shell

A terminal (or to be more precise, a terminal emulator) is a software, that

## Most important commands

```bash
echo "Hello world"  # Write something to the console
pwd                 # Print current directory path
ls                  # List content of current directory
ls -a|--all         # List all (incl. hidden) content
ls -l               # List content in long form (incl. permissions)
```

### Directories and files

```bash
cd directory_name               # Change directory: go to directory_name
cd relative/path                # Specify directory using relative path
cd /var/something               # Specify directory using absolute path
cd /                            # Go to root directory
cd ~                            # Go to home directory
cd ..                           # Go to parent directory

mkdir dir_name                  # Create directory "dir_name"

touch filename.txt              # Create empty file with name "filename.txt"
rm filename.txt                 # Remove file
rm -r|-R|--recursive dirname    # Remove directory and its content recursively
mv file.txt new_file.txt        # Rename file
mv file.txt directory_name/     # Move file to another directory
cp file.txt directory_name/     # Copy file

cat filename.txt                # Print contents of file (concatenate)
cat file1.txt file2.txt         # Concatenate and print contents of multiple files
less filename.txt               # Print part of the file content in interactive session
head -n 5 filename.txt          # Print first n lines of file content
tail -n 5 filename.txt          # Print last n lines of file content

wc filename.txt                 # List number of lines words and characters in the file
```

### File permissions

```bash
chmod
chown
sudo
```

### Manuals and getting help

```bash
man ls                  # Show the manual for the ls program
```
