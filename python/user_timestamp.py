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

def bet_count(jsons):
    count = 0
    # for i in jsons.results:
    for i in jsons["response"]["results"]:
        count += 1
    return count - 1

# print(count_results(response))

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
    # print(entity_dict)
    for key in entity_dict:
        if key.lower() in sent:
            for tag in entity_dict[key][0]:
                tags.add(tag)
                wiki_links.add(entity_dict[key][2])
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

        result = response["response"]["results"][j]

        start_t = result["alternatives"][0]["words"][0]["startTime"]
        if j == res_count - 1:
            end_t = result["alternatives"][0]["words"][-1]["endTime"]
        else:
            end_t = response["response"]["results"][j+1]["alternatives"][0]["words"][0]["startTime"]

        end_t = float(end_t[:-1])
        start_t = float(start_t[:-1])
        if in_range_time(time, start_t, end_t):
            # print(result)
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

def binary_phrase(response, lo, hi, x, res_count):
    # Check base case
    print(hi, lo, x)
    if hi >= lo:

        mid = (hi + lo) // 2
        
        result = response["response"]["results"][mid]

        start = result["alternatives"][0]["words"][0]["startTime"]
        if mid == res_count:
            end = result["alternatives"][0]["words"][-1]["endTime"]
        else:
            end = response["response"]["results"][mid+1]["alternatives"][0]["words"][0]["startTime"]

        # If element is present at the middle itself

        end = float(end[:-1])
        start = float(start[:-1])
        
        if in_range_time(x, start, end):
            return mid

        # If element is smaller than mid, then it can only
        # be present in left subarray
        elif start > x:
            return binary_phrase(response, lo, mid - 1, x, res_count)

        # Else the element can only be present in right subarray
        else:
            return binary_phrase(response, mid + 1, hi, x, res_count)

    else:
        # Element is not present in the array
        return -1

def binary_word(response, lo, hi, x, res_count, phrase):
    if hi >= lo:

        mid = (hi + lo) // 2
        
        result = response["response"]["results"][phrase]

        start = result["alternatives"][0]["words"][mid]["startTime"]
        if mid == res_count:
            end = result["alternatives"][0]["words"][mid]["endTime"]
        else:
            end = result["alternatives"][0]["words"][mid+1]["startTime"]

        # If element is present at the middle itself

        end = float(end[:-1])
        start = float(start[:-1])
        
        if in_range_time(x, start, end):
            return mid

        # If element is smaller than mid, then it can only
        # be present in left subarray
        elif start > x:
            return binary_word(response, lo, mid - 1, x, res_count, phrase)

        # Else the element can only be present in right subarray
        else:
            return binary_word(response, mid + 1, hi, x, res_count, phrase)

    else:
        # Element is not present in the array
        return -1

def find_start_end_time2(jsons, time):
    response = jsons

    count = bet_count(response) 
    phrase = binary_phrase(response, 0, count, time, count)
    ct = count_words(response["response"]["results"][phrase])
    word = binary_word(response, 0, ct, time, ct, phrase)
    res = response["response"]["results"][phrase]["alternatives"][0]["words"][word]
    return (res["word"], res["startTime"], res["endTime"], res)

def process_timestamp(jsons, time):
    response = jsons

    pin_word, start_t, end_t, word_object = find_start_end_time2(jsons, time)
    if pin_word == start_t == end_t == word_object == 0:
        print("pinned something before they even said something you fucking idiot")
        return
    beg_word, beg_start, beg_end, sentence, s_end = get_beg_sentence(response, word_object)
    topics_response, entities = topics()
    entity_dict = entity_filter_search(entities, topics_response)
    props = search_for_proper(sentence, entity_dict)
    wikis = []
    for url in props[1]:
        if url[:4] == "http":
            print("HELLO DOG")
            wikis.append(parsewiki(url))

    res = {time: [props[0], beg_start, s_end, sentence, wikis]}
    return json.dumps(res)


sec = timedelta(0,10,0,1)


print(find_start_end_time2(response, 51.0))
# print(process_timestamp(response, 25.0))

