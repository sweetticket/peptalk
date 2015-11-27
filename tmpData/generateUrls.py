import pdb
import json
import sys
import os
from pymongo import MongoClient
  

def main(args):

  args = args[1:]
  

  for file_name in args:
    semester = file_name.split('_')[0] #file_name = "FA15_subjects"
    urls = []
    with open(file_name, 'r') as f:
      parsed_data = json.load(f)
      subjects = parsed_data["data"]["subjects"]
      for subject in subjects:
        val = subject["value"]
        url = "".join(["https://classes.cornell.edu/api/2.0/search/classes.json?roster=", semester, "&subject=", val])
        urls.append(url)
    with open(file_name.split('.json')[0]+"_urls.txt", 'w') as f2:
      for url in urls:
        f2.write(url+'\n')


if __name__ == "__main__":
  main(sys.argv)
