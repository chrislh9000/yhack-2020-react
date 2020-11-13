from nlp import *
from datetime import time
from datetime import timedelta
from beg_sentence import *
import string
import json
import datetime
from wikiparser import *

f = open('data.json',)

response = json.load(f)
f.close()
########################################################################################
# math helpers                                                                         #
########################################################################################
def count_results(jsons):
    count = 0
    # for i in jsons.results:
    for i in jsons["response"]["results"]:
        count += 1
    return count

print(count_results(response))

def count_words(result):
    count = 0
    for i in result["alternatives"][0]["words"]:
        count += 1
    return count
# print(count_words(response["response"]["results"]))

def in_range_time(pin_time, start_time, end_time):
    if pin_time <= end_time and pin_time >= start_time:
        return True
    return False

########################################################################################
# funcs                                                                                #
########################################################################################

def search_for_proper(sentence, entity_dict):
    sent = sentence.lower()
    tags = set()
    wiki_links = set()
    res = []
    res2 = []
    print(entity_dict)
    for key in entity_dict:
        if key.lower() in sent:
            for tag in entity_dict[key][0]:
                tags.add(tag)
                wiki_links.add(entity_dict[key][2])

                
    
            

    # print(sent)
    # for word in sent:
    #     if word == "":
    #         continue
    #     if word[-1] == ".":
    #         word = word[:-1]
    #     for key in entity_dict:
    #         print(key)
    #         if key.lower() == word.lower():
    #             for tag in entity_dict[key][0]:
    #                 tags.add(tag)
    #                 wiki_links.add(entity_dict[key][2])
    for i in tags:
        res.append(i)
    for j in wiki_links:
        res2.append(j)
    return (res, res2)
# print(search_for_proper("Hi im a hi.", {"hi": [["hi", "hi"],1] , "im":[["me"],1],}))

# TODO: num appears

# based on pinned time, searches for word
def find_start_end_time(jsons, time):
    response = jsons

    res_count = count_results(response)
    # print(res_count)
    for j in range(res_count):
        # print("\n\n\n")
        # print("\t\t" + str(time))

        # print(result.alternatives[0].words[0], result.alternatives[0].words[-1])

        result = response["response"]["results"][j]
        
        start_t = result["alternatives"][0]["words"][0]["startTime"]
        if j == res_count - 1:
            end_t = result["alternatives"][0]["words"][-1]["endTime"]
        else:
            end_t = response["response"]["results"][j+1]["alternatives"][0]["words"][0]["startTime"]

        end_t = float(end_t[:-1])
        start_t = float(start_t[:-1])
        if in_range_time(time, start_t, end_t):
            print(result)
            count = count_words(result)
            for i in range(count):
                word_start = result["alternatives"][0]["words"][i]["startTime"]
                if i == count - 1:
                    word_end = result["alternatives"][0]["words"][i]["endTime"]
                else:
                    word_end = result["alternatives"][0]["words"][i+1]["startTime"]
                word_start = float(word_start[:-1])
                word_end = float(word_end[:-1])
                if in_range_time(time, word_start, word_end):
                    return (result["alternatives"][0]["words"][i]["word"],
                            result["alternatives"][0]["words"][i]["startTime"],
                            result["alternatives"][0]["words"][i]["endTime"],
                            result["alternatives"][0]["words"][i])


def process_timestamp(jsons, time):
    response = jsons

    pin_word, start_t, end_t, word_object = find_start_end_time(jsons, time)
    if pin_word == start_t == end_t == word_object == 0:
        print("pinned something before they even said something you fucking idiot")
        return
    beg_word, beg_start, beg_end, sentence, s_end = get_beg_sentence(response, word_object)
    topics_response, entities = topics()
    entity_dict = entity_filter_search(entities, topics_response)
    props = search_for_proper(sentence, entity_dict)
    wikis = []
    print(props)
    for url in props[1]:
        if url[:4] == "http":
            wikis.append(parsewiki(url))

    res = {time: [props[0], beg_start, s_end, sentence, wikis]}
    print(type(props[0]), type(beg_start), type( s_end), type(sentence), type(time), type(wikis))
    return json.dumps(res)


sec = timedelta(0,10,0,1)
print(process_timestamp(response, 16.0))






def binary_search(arr, low, high, x):

    # Check base case
    if high >= low:

        mid = (high + low) // 2

        # If element is present at the middle itself
        if arr[mid] == x:
            return mid

        # If element is smaller than mid, then it can only
        # be present in left subarray
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)

        # Else the element can only be present in right subarray
        else:
            return binary_search(arr, mid + 1, high, x)

    else:
        # Element is not present in the array
        return -1

# # Test array
# arr = [ 2, 3, 4, 10, 40 ]
# x = 10

# # Function call
# result = binary_search(arr, 0, len(arr)-1, x)

# if result != -1:
#     print("Element is present at index", str(result))
# else:
#     print("Element is not present in array")
