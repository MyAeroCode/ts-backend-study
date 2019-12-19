import AWS from "aws-sdk";
import { conn } from "./conn";
import { CreateTableInput, PutItemInput } from "aws-sdk/clients/dynamodb";

const LolChampions: string[] = [
    "가렌",
    "갈리오",
    "갱플랭크",
    "그라가스",
    "그레이브즈",
    "나르",
    "나미",
    "나서스",
    "노틸러스",
    "녹턴",
    "누누와 윌럼프",
    "니달리",
    "니코",
    "다리우스",
    "다이애나",
    "드레이븐",
    "라이즈",
    "라칸",
    "람머스",
    "럭스",
    "럼블",
    "레넥톤",
    "레오나",
    "렉사이",
    "렝가",
    "루시안",
    "룰루",
    "르블랑",
    "리 신",
    "리븐",
    "리산드라",
    "마스터 이",
    "마오카이",
    "말자하",
    "말파이트",
    "모데카이저",
    "모르가나",
    "문도 박사",
    "미스 포츈",
    "바드",
    "바루스",
    "바이",
    "베이가",
    "베인",
    "벨코즈",
    "볼리베어",
    "브라움",
    "브랜드",
    "블라디미르",
    "블리츠크랭크",
    "빅토르",
    "뽀삐",
    "사이온",
    "사일러스",
    "샤코",
    "세나",
    "세주아니",
    "소나",
    "소라카",
    "쉔",
    "쉬바나",
    "스웨인",
    "스카너",
    "시비르",
    "신 짜오",
    "신드라",
    "신지드",
    "쓰레쉬",
    "아리",
    "아무무",
    "아우렐리온 솔",
    "아이번",
    "아지르",
    "아칼리",
    "아트록스",
    "아펠리오스",
    "알리스타",
    "애니",
    "애니비아",
    "애쉬",
    "야스오",
    "에코",
    "엘리스",
    "오공",
    "오른",
    "오리아나",
    "올라프",
    "요릭",
    "우디르",
    "우르곳",
    "워윅",
    "유미",
    "이렐리아",
    "이블린",
    "이즈리얼",
    "일라오이",
    "자르반 4세",
    "자야",
    "자이라",
    "자크",
    "잔나",
    "잭스",
    "제드",
    "제라스",
    "제이스",
    "조이",
    "직스",
    "진",
    "질리언",
    "징크스",
    "초가스",
    "카르마",
    "카밀",
    "카사딘",
    "카서스",
    "카시오페아",
    "카이사",
    "카직스",
    "카타리나",
    "칼리스타",
    "케넨",
    "케이틀린",
    "케인",
    "케일",
    "코그모",
    "코르키",
    "퀸",
    "클레드",
    "키아나",
    "킨드레드",
    "타릭",
    "탈론",
    "탈리야",
    "탐 켄치",
    "트런들",
    "트리스타나",
    "트린다미어",
    "트위스티드 페이트",
    "트위치",
    "티모",
    "파이크",
    "판테온",
    "피들스틱",
    "피오라",
    "피즈",
    "하이머딩거",
    "헤카림"
];

let tableName = "UserSample";
export default async function SampleGenerator() {
    conn.describeTable({ TableName: tableName })
        .promise()
        .catch(async function createSampleTable() {
            console.log("# 새로운 테이블을 만듭니다.");
            let args: CreateTableInput = {
                TableName: tableName,
                AttributeDefinitions: [
                    {
                        AttributeName: "name",
                        AttributeType: "S"
                    }
                ],
                KeySchema: [
                    {
                        AttributeName: "name",
                        KeyType: "HASH"
                    }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            };
            await conn.createTable(args).promise();
        })
        .then(async function createSampleData() {
            console.log("# 데이터를 삽입합니다.");
            LolChampions.forEach(async name => {
                let args: PutItemInput = {
                    TableName: tableName,
                    Item: {
                        name: {
                            S: name
                        }
                    }
                };
                conn.putItem(args)
                    .promise()
                    .then(async function error(result) {
                        if (result.$response.error) {
                            console.log("ERR", name);
                        }
                    });
            });
        })
        .then(async function createSampleDataDone() {
            console.log("# 데이터 생성 종료.");
        });
}
